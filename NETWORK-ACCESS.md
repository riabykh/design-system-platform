# Network Access Setup

This guide explains how to make your Design System Platform accessible from other computers on your local network.

## Quick Start

### 1. Start the Development Server (Network Mode)

```bash
npm run dev:network
```

This will:
- Start the server accessible from other computers
- Display your local IP address for network access

### 2. Access from Other Computers

The server will show you URLs like:
- **Local**: `http://localhost:3000` (only on your computer)
- **Network**: `http://192.168.1.109:3000` (accessible from other computers)

### 3. Share the Network URL

Give the Network URL to other team members. They can access your Design System Platform from:
- Other computers on the same WiFi network
- Mobile devices on the same network
- Any device connected to your local network

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (network accessible) |
| `npm run dev:local` | Start dev server (localhost only) |
| `npm run dev:network` | Start dev server + show network URLs |
| `npm run ip` | Just show your network IP address |
| `npm run start:network` | Start production server (network accessible) |

## Troubleshooting

### Can't Access from Other Computers?

1. **Check Firewall**: Make sure your computer's firewall allows connections on port 3000
2. **Same Network**: Ensure all devices are on the same WiFi network
3. **Port Available**: Try a different port if 3000 is blocked:
   ```bash
   npm run dev -- -p 3001
   ```

### Find Your IP Address

```bash
npm run ip
```

### Manual IP Check

On macOS/Linux:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

On Windows:
```cmd
ipconfig | findstr "IPv4"
```

## Security Notes

- ⚠️ **Development Only**: This setup is for local development
- 🔒 **Not for Production**: Don't use this for public-facing applications
- 🏠 **Local Network Only**: Only accessible within your local network
- 👥 **Team Access**: Perfect for sharing with colleagues on the same network

## Production Deployment

For production use, consider:
- **Vercel**: `vercel --prod`
- **Netlify**: Connect your GitHub repository
- **Railway**: Deploy with one click
- **DigitalOcean**: Full server control

## Example Usage

1. **Start the server**:
   ```bash
   npm run dev:network
   ```

2. **Share with team**:
   ```
   Hey team! Check out the new design system:
   http://192.168.1.109:3000
   ```

3. **Mobile testing**:
   - Open the Network URL on your phone
   - Test responsive design
   - Share with stakeholders

## Network Requirements

- All devices must be on the same local network (WiFi/LAN)
- No internet required for local access
- Works with any device (laptop, phone, tablet)
- Perfect for team collaboration and testing
