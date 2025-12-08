from .email_reader import fetch_email
from .email_patterns import EmailPatterns
import re

def analyze_email(email_content):
    if not email_content:
        return "No new email to analyze."

    body = email_content['body']

    spam_patterns = [
        EmailPatterns.SPAM,
        EmailPatterns.SPAM_OFFER,
        EmailPatterns.SPAM_MEDICATION,
        EmailPatterns.SPAM_CASH,
        EmailPatterns.SPAM_CREDIT,
        EmailPatterns.SPAM_VIAGRA,
        EmailPatterns.SPAM_WEIGHT_LOSS
    ]

    scam_patterns = [
        EmailPatterns.SCAM,
        EmailPatterns.SCAM_PHISHING,
        EmailPatterns.SCAM_LOTTERY,
        EmailPatterns.SCAM_NIGERIAN,
        EmailPatterns.SCAM_IMPERSONATION,
        EmailPatterns.SCAM_TECH_SUPPORT,
        EmailPatterns.SCAM_JOB_OFFER
    ]

    for pattern in spam_patterns:
        if re.search(pattern, body):
            return "The email is classified as SPAM."

    for pattern in scam_patterns:
        if re.search(pattern, body):
            return "The email is classified as SCAM."

    return "The email is classified as LEGITIMATE."


def analyze():
    # Fetch the latest email
    latest_email = fetch_email()
    result = analyze_email(latest_email)
    #print("Loading...")
    print(result)
    return {"analysis": result}