import imaplib
import email
from dotenv import load_dotenv, find_dotenv
import os
import re
from email.header import decode_header

load_dotenv(find_dotenv())

def fetch_email():
    imap = None
    try:
        imap = imaplib.IMAP4_SSL(
            host="imap.gmail.com",
            port=993,
            timeout=10
        )
        imap.login(user=os.getenv("EMAIL_USER"), password=os.getenv("PASSWORD"))
        imap.select("inbox")
        status, messages = imap.search(None, "UNSEEN")
        if status != "OK" or not messages[0]:
            return None

        # Fetch the last email
        latest_email_num = messages[0].split()[-1]
        status, msg_data = imap.fetch(latest_email_num, "(RFC822)")
        
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                subject, encoding = decode_header(msg["Subject"])[0]
                if isinstance(subject, bytes):
                    subject = subject.decode(encoding or "utf-8")
                from_ = msg.get("From")
                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))
                        if content_type == "text/plain" and "attachment" not in content_disposition:
                            body = part.get_payload(decode=True).decode()
                            break
                else:
                    body = msg.get_payload(decode=True).decode()
                
                return {'subject': subject, 'from': from_, 'body': body}
        return None
    finally:
        if imap:
            imap.logout()