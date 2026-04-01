from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from email.mime.text import MIMEText
import base64
import os
import os
import base64
from email.mime.text import MIMEText



# Gmail send permission
SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_FILE = os.path.join(BASE_DIR, "credentials.json")
TOKEN_FILE = os.path.join(BASE_DIR, "token.json")


def get_gmail_service():
    """
    Authenticates and returns Gmail API service
    """
    creds = None

    # Load existing token
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    # If no valid credentials, login
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(
            CREDENTIALS_FILE, SCOPES
        )
        creds = flow.run_local_server(port=0)

        # Save token
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)


def send_reset_email(to_email, reset_link):
    """
    Sends password reset email via Gmail API
    """
    service = get_gmail_service()

    body = f"""
Hello,

You requested to reset your SafeFace password.

Click the link below to reset your password:
{reset_link}

This link will expire in 15 minutes.

If you did not request this, please ignore this email.

Regards,
SafeFace Team
"""

    message = MIMEText(body)
    message["to"] = to_email
    message["subject"] = "SafeFace Password Reset"

    raw_message = base64.urlsafe_b64encode(
        message.as_bytes()
    ).decode()

    service.users().messages().send(
        userId="me",
        body={"raw": raw_message}
    ).execute()


