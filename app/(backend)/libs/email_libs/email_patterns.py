
class EmailPatterns:
    
    SPAM = r"^(Congratulations! You've won a [0-9]+ dollar prize!)$"
    SPAM_OFFER = r"^(Limited time offer: Buy one get one free on all items!)$"
    SPAM_MEDICATION = r"^(Get cheap medications without a prescription!)$"
    SPAM_CASH = r"^(Earn $[0-9]+ per day working from home!)$"
    SPAM_CREDIT = r"^(Improve your credit score in just 30 days!)$"
    SPAM_VIAGRA = r"^(Buy Viagra at a discounted price now!)$"
    SPAM_WEIGHT_LOSS = r"^(Lose 10 pounds in one week with this miracle pill!)$"
    
    SCAM = r"^(Urgent: Your account has been compromised. Click here to secure it.)$"
    SCAM_PHISHING = r"^(Dear user, please verify your account information by clicking the link below:$)"
    SCAM_LOTTERY = r"^(You've been selected as the winner of the international lottery!)$"
    SCAM_NIGERIAN = r"^(I am a prince from Nigeria and need your help to transfer $10 million.)$"
    SCAM_IMPERSONATION = r"^(This is your bank. We need to verify your identity immediately.)$"
    SCAM_TECH_SUPPORT = r"^(Your computer is infected with a virus. Call this number for support.)$"
    SCAM_JOB_OFFER = r"^(Congratulations! You've been selected for a high-paying job abroad.)$"