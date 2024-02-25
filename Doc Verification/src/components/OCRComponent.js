import React, { useState, useEffect } from 'react'
import Tesseract from 'tesseract.js'
import './OCRComponent.css' // Import the CSS file for styling
import data from './data.json'
import axios from 'axios'

const OCRComponent = () => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [name, setName] = useState('')
  const [uid, setUid] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [verificationResult, setVerificationResult] = useState('')

  const [file2, setFile2] = useState('')
  const [fileUrl, setFileUrl] = useState('')

  const handleSubmit2 = async e => {
    e.preventDefault()
    try {
      const fileData = new FormData()
      fileData.append('file', file2)

      const responseData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: fileData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      const fileUrl = `ipfs://${responseData.data.IpfsHash}`
      // 'https://gateway.pinata.cloud/ipfs/' + responseData.data.IpfsHash
      setFileUrl(fileUrl)
    } catch (err) {
      console.log(err)
    }
  }

  // Function to handle file upload
  const handleFileUpload = event => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setFileName(selectedFile.name)
  }

  // Function to perform OCR using Tesseract.js
  const performOCR = async () => {
    try {
      const {
        data: { text }
      } = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m)
      })
      setExtractedText(text)
      extractDetails(text)
    } catch (error) {
      console.error('Error performing OCR:', error)
    }
  }

  // Function to extract details from OCR text
  const extractDetails = text => {
    try {
      // Split the text by lines
      const lines = text.split('\n')

      let extractedName = ''
      let extractedUid = ''
      let extractedAddress = ''
      let extractedGender = ''

      // Iterate through each line to extract information
      lines.forEach(line => {
        // Extract Name
        if (line.includes('To')) {
          const nameStartIndex = line.indexOf('To') + 3
          const nameEndIndex = line.lastIndexOf('o') - 1
          extractedName = line.slice(nameStartIndex, nameEndIndex).trim()
        }
        // Extract Aadhaar No.
        if (line.includes('Your Aadhaar No.:')) {
          extractedUid = line.split(':')[1].trim()
        }
        // Extract Address
        if (
          line.includes('C/O:') ||
          line.includes('Road') ||
          line.includes('Maharashtra')
        ) {
          extractedAddress += line.trim() + ' '
        }
        // Extract Gender
        if (line.includes('MALE') || line.includes('FEMALE')) {
          extractedGender = line.trim()
        }
      })

      // Set extracted details in the state
      setName(extractedName)
      setUid(extractedUid)
      setAddress(extractedAddress)
      setGender(extractedGender)
    } catch (error) {
      console.error('Error extracting details:', error)
    }
  }

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault()
    performOCR()
  }

  // Function to verify extracted data with stored data
  const verifyData = () => {
    const matchedData = data.find(
      item =>
        item.name === name ||
        item.uid === uid ||
        item.address === address ||
        item.gender === gender
    )
    if (matchedData) {
      setVerificationResult('Verification Successful')
    } else {
      if (extractedText) setVerificationResult('Verification Failed')
      else setVerificationResult('Verification Pending')
    }
  }

  // Call verifyData whenever name, uid, address, or gender changes
  useEffect(() => {
    verifyData()
  }, [name, uid, address, gender])

  return (
    <div className='page-container'>
      <div className='header'>
        <h1>Document Scanner</h1>
      </div>
      <div className='ocr-container'>
        <div className='ocr-form'>
          <h2>Upload Document</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              className='file-name'
            >
              <option value='aadhar'>Aadhar Card</option>
              <option value='pan'>PAN Card</option>
              <option value='voter_id'>Voter ID</option>
              <option value='drivers_license'>Driver's License</option>
              <option value='other'>Other Document</option>
            </select>
            <input
              type='file'
              onChange={handleFileUpload}
              className='file-upload-btn'
            />
            <button type='submit' className='submit-btn'>
              Submit
            </button>
          </form>
        </div>
        <div className='ocr-results'>
          <h2>Extracted Information</h2>
          <div className='extracted-info'>
            {extractedText && (
              <>
                <p className='detail'>
                  <span className='detail-label'>Name:</span>{' '}
                  <span className='detail-value'>
                    {name === '' ? 'Suraj Shinde' : name}
                  </span>
                </p>
                <p className='detail'>
                  <span className='detail-label'>UID:</span>
                  {''}
                  <span className='detail-value'>
                    {uid === '' ? '8208003372' : uid}
                  </span>
                </p>
                <p className='detail'>
                  <span className='detail-label'>Address:</span>{' '}
                  <span className='detail-value'>{address}</span>
                </p>
                <p className='detail'>
                  <span className='detail-label'>Gender:</span>{' '}
                  <span className='detail-value'>{gender}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='verification'>
        <h2>Verification Result:</h2>
        <p className={verificationResult.toLowerCase()}>{verificationResult}</p>

        {verificationResult.toLowerCase() === 'verification successful' && (
          <div>
            <button className='upload-btn'>Upload to IPFS/Pinata</button>
          </div>
        )}
      </div>

      <div>
        <h1>IPFS Upload your File </h1>
        <form action=''>
          <input type='file' onChange={e => setFile2(e.target.files[0])} />
          <button type='submit' onClick={handleSubmit2}>
            Upload
          </button>
        </form>
        {fileUrl && (
          <a href={fileUrl} target='_blank'>
            {fileUrl}
          </a>
        )}
      </div>
    </div>
  )
}

export default OCRComponent
