from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Note
from telethon.sync import TelegramClient
from django.http import JsonResponse
from threading import Event
import environ
import asyncio
import os
# from django.utils.asyncio import sync_to_async
from telethon import TelegramClient
from telethon.sessions import SQLiteSession

env = environ.Env()
environ.Env.read_env()

otp_event = Event()
otp_code = None

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

async def otp_prompt():
    global otp_code
    print("Cần nhập OTP")
    otp_event.wait()  # Chờ sự kiện otp_event được kích hoạt
    otp_event.clear()  # Reset lại sự kiện sau khi đã được kích hoạt
    return otp_code

async def start_client(phone):
    sessionpath = './session/' + phone
    if not os.path.exists('./session/'):
        os.makedirs('./session/')

    client = TelegramClient(SQLiteSession(sessionpath), api_id=24750881, api_hash='9b3a980c6c634ed25727e3d9d1287e15')
    await client.start(phone=phone, code_callback=lambda: otp_prompt())
    await client.disconnect()

def run_async_client(phone):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(start_client(phone))

class StartTelegramSessionView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            phone = request.data.get('phoneNumber')
            print('adfadf', phone)
            if not phone:
                return JsonResponse({"error": "Phone number is required"}, status=400)

            run_async_client(phone)

            return JsonResponse({"status": "Telegram session started"}, status=201)

        except Exception as e:
            print(f"Error occurred: {e}")
            return JsonResponse({"error": str(e)}, status=500)

class ReceiveOtpView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        global otp_code
        otp_code = request.data.get('otp')
        print('otp_code', otp_code)
        otp_event.set()  # Kích hoạt sự kiện để tiếp tục quy trình xác thực
        return Response({"status": "OTP received"}, status=status.HTTP_200_OK)