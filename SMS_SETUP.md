# SMS Chat Me Feature - Setup Guide

## Overview
When customers click the "Chat Me" button on a product page, an SMS will be sent to your phone number (612-720-0910) with the product details and link.

## Setup Instructions

### 1. Create a Twilio Account

1. Go to [Twilio.com](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email and phone number
4. You'll get **$15 in free credit** (enough for ~500 SMS messages)

### 2. Get Your Twilio Credentials

After signing up, you'll need three pieces of information:

1. **Account SID** - Found on your Twilio Console Dashboard
2. **Auth Token** - Found on your Twilio Console Dashboard (click "Show" to reveal)
3. **Twilio Phone Number** - Get a free phone number:
   - Go to Phone Numbers → Buy a Number
   - Choose a US number (free with trial)
   - This will be the "From" number for your SMS

### 3. Add Credentials to `.env.local`

Add these three lines to your `.env.local` file:

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID="your_account_sid_here"
TWILIO_AUTH_TOKEN="your_auth_token_here"
TWILIO_PHONE_NUMBER="+1234567890"
```

**Example:**
```env
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_secret_token_here"
TWILIO_PHONE_NUMBER="+15551234567"
```

**Important Notes:**
- Your Twilio phone number must be in E.164 format: `+1XXXXXXXXXX`
- Keep your Auth Token secret (never commit to Git)
- The `.env.local` file is already in `.gitignore`

### 4. Verify Your Phone Number (Trial Account)

If using a trial account, you need to verify your phone number (612-720-0910):

1. Go to Twilio Console → Phone Numbers → Verified Caller IDs
2. Click "Add a new Caller ID"
3. Enter: `+16127200910`
4. Twilio will send you a verification code
5. Enter the code to verify

**Note:** Once verified, you can receive SMS from your Twilio trial account!

### 5. Restart Your Dev Server

After adding the environment variables:

```bash
# Stop your current server (Ctrl+C)
npm run dev
```

### 6. Test the Feature

1. Go to any product page: `http://localhost:3000/products/[id]`
2. Click the **"Chat Me"** button
3. You should receive an SMS within seconds!

**SMS Message Format:**
```
🛍️ New Product Inquiry!

Product: [Product Name]

View Product:
https://hmoobwin.com/products/[id]

📱 Customer wants to order this item!
```

## How It Works

### Flow Diagram
```
Customer clicks "Chat Me"
    ↓
ChatMeButton sends request to /api/send-sms
    ↓
API validates product info
    ↓
API calls Twilio API
    ↓
Twilio sends SMS to +16127200910
    ↓
You receive SMS with product link
    ↓
Customer sees "Message sent!" confirmation
```

### Cost (After Free Trial)

- **SMS Cost**: $0.0079 per message (less than 1 cent!)
- **Free Trial**: $15 credit = ~1,800 messages
- **Monthly**: If you get 100 inquiries/month = $0.79/month

## Troubleshooting

### "SMS service not configured"
- **Cause**: Missing environment variables
- **Fix**: Check `.env.local` has all three Twilio variables
- **Verify**: Restart dev server after adding variables

### "Failed to send SMS"
- **Cause**: Phone number not verified (trial account)
- **Fix**: Verify +16127200910 in Twilio Console
- **Alternative**: Upgrade to paid account (removes restriction)

### SMS not received
- **Check 1**: Phone number format is correct: `+16127200910`
- **Check 2**: You have Twilio credit remaining
- **Check 3**: Check Twilio Console → Logs → Messaging for delivery status
- **Check 4**: Check spam/blocked messages on your phone

### "Invalid phone number"
- **Cause**: Twilio phone number format incorrect
- **Fix**: Must be in E.164 format: `+15551234567` (with + and country code)

## Upgrading to Production

When ready to go live:

1. **Upgrade Twilio Account**
   - Remove trial restrictions
   - Add credit or enable auto-recharge
   - No need to verify recipient numbers anymore

2. **Update Environment Variables on Railway**
   ```
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+15551234567
   ```

3. **Update Product URL in Code**
   - The URL is already set to `https://hmoobwin.com/products/[id]`
   - Should work automatically in production!

## Security Notes

✅ **Secure:**
- Twilio credentials stored in `.env.local` (not in code)
- `.env.local` is gitignored (never committed)
- Auth Token kept secret

⚠️ **Important:**
- Never commit `.env.local` to Git
- Never share your Auth Token
- Regenerate token if accidentally exposed
- Consider rate limiting if you get spam clicks

## Advanced: Rate Limiting (Optional)

To prevent spam/abuse, you could add rate limiting:

```javascript
// In the API route, track requests by IP
// Only allow 1 SMS per IP per 5 minutes
```

This prevents users from clicking "Chat Me" multiple times rapidly.

## Alternative: WhatsApp (Future Enhancement)

Twilio also supports WhatsApp messages! You could:
- Send to WhatsApp instead of SMS
- Include product image
- Enable two-way chat

To add WhatsApp:
1. Set up Twilio WhatsApp sandbox
2. Change API endpoint to WhatsApp API
3. Update message format to include media

## Files Modified

### New Files
- `app/products/[id]/ChatMeButton.jsx` - Client component for button
- `app/api/send-sms/route.js` - API endpoint for sending SMS
- `SMS_SETUP.md` - This documentation

### Modified Files
- `app/products/[id]/page.js` - Added ChatMeButton component

## Support

- **Twilio Docs**: https://www.twilio.com/docs/sms
- **Twilio Console**: https://console.twilio.com
- **Twilio Support**: https://support.twilio.com

---

**Status:** ✅ Ready to use (after Twilio setup)  
**Cost:** Free trial ($15 credit) or $0.0079/SMS  
**Your Phone:** +16127200910
