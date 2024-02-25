# KYC Verification Using Blockchain

This project aims to implement KYC (Know Your Customer) verification using blockchain technology. KYC is a process where individuals provide their personal information and documentation to verify their identity to access financial services. By leveraging blockchain, this project aims to create a secure and efficient KYC verification system.

## Overview

The KYC verification process involves the following steps:

1. **New User Registration**: Users will create an account by entering their personal details.
2. **Document Upload**: Users will upload their documents (e.g., Aadhar Card, PAN Card) required for KYC verification.
3. **Live Location Access**: Users will grant access to their live location using GPS.
4. **Live Photo Capture**: Users will capture a live photo using their webcam.
5. **Data Verification**: The uploaded data will be verified using OCR (Optical Character Recognition) technology and an API provided by the Indian government's UI (Unique Identification) system.
6. **Blockchain Storage**: If the user is successfully verified, their data will be stored securely in Pinata Storage, which is a blockchain-based storage system.
7. **Reuse of KYC Data**: Once a user is successfully verified with one bank, their KYC data can be shared with other banks to avoid redundant KYC processes.

## Usage

1. **New User Registration**:
    - Users can create an account by providing their personal details such as name, address, and contact information.

2. **Document Upload**:
    - Users will upload scanned copies of their identification documents, such as Aadhar Card and PAN Card.

3. **Live Location Access**:
    - Users will grant permission to access their live location using GPS.

4. **Live Photo Capture**:
    - Users will capture a live photo using their device's webcam.

5. **Data Verification**:
    - The system will verify the uploaded data using OCR technology and the Indian government's UIDAI API.
    - If the verification is successful, the user's data will proceed to the next step.

6. **Blockchain Storage**:
    - Verified user data will be securely stored in Pinata Storage, ensuring data integrity and immutability.


By implementing KYC verification using blockchain, we aim to create a more secure, transparent, and efficient process for verifying customer identities while ensuring data privacy and integrity.


This project was developed during the Synergy 1.0 hackathon at DJSCE.

### Team Chipi Chipi
- [Suraj Shinde](https://github.com/Suraj3240)
- [Varad Patil](https://github.com/Varad2501)
- [Rahul Chougule](https://github.com/rahul15rc)
- [Aditya Repe](https://github.com/AdityaRepe)
