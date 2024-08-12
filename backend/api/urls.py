from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("sessions/start_getsession/", views.StartTelegramSessionView.as_view(), name="start_getsession"),
    path("sessions/receive_opt/", views.ReceiveOtpView.as_view(), name="session-otp"),
]