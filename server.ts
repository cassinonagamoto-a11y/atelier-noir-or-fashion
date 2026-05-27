/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Lazy-initialize Gemini client to avoid crash on startup if API key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error('GEMINI_API_KEY is not configured in environment or Secrets panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser for API Requests
  app.use(express.json());

  // API Endpoint: Bespoke Consultant (Uses Gemini 3.5 Flash for high-end fashion design curation)
  app.post('/api/bespoke-consultant', async (req, res) => {
    try {
      const { prompt, category, measurements } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Preferences and description prompt is required.' });
      }

      // Check for Gemini API Client availability, otherwise fallback beautifully to offline luxury tailoring generator.
      let hasApiKey = true;
      try {
        getGeminiClient();
      } catch (err: any) {
        hasApiKey = false;
        console.warn('Gemini API is unavailable, utilizing local premium bespoke curation engine.', err.message);
      }

      const measurementsDisplay = measurements 
        ? `Height: ${measurements.height}cm, Neck: ${measurements.neck}cm, Bust: ${measurements.bust}cm, Waist: ${measurements.waist}cm, Hips: ${measurements.hips}cm, Shoulder: ${measurements.shoulder}cm, Sleeve: ${measurements.sleeve}cm, Inseam: ${measurements.inseam}cm`
        : 'Self-tailored adjustments apply.';

      if (hasApiKey) {
        const ai = getGeminiClient();

        // High-end couture developer system instruction
        const systemInstruction = `You are "La Directrice" - the legendary head designer and head of luxury couture at "Atelier Noir & Or" in Paris.
The brand values: Noire (Deep Charcoal and Absolute Black) mixed with Or (Stunning Champagne Gold accents). Geometric precision, architectural structures, absolute minimalism, quiet luxury, "less but better".
You must formulate an exquisitely poetic, high-fashion styling critique and technical custom couture blueprint for a VIP client.
Always write in an authoritative, artistic, upscale, yet friendly and accommodating tone.
Format the output in clean, crisp, editorial-ready Markdown without any technical jargon.
Structure your reply exactly as follows:
# COUTURE PORTFOLIO: [Create a glamorous, artistic name for this custom piece, prefixed with "Oeuvre No. - "]

## I. L'Inspiration & Poetical Vision
[Write a short, poetic paragraph describing the design concept and how it pairs with the client's requested style and mood]

## II. Les Matières (Fibers & Textures)
- **Primary Canvas**: [A rich premium noir fabric e.g. Brushed Cashmere, Heavy Silk Crêpe, Matte Satin] - [Aesthetic justification]
- **Accents & Luminary**: [Champagne gold accents e.g., thread embroidery, gilded velvet panels, metallic lamé details]
- **Structure Support**: [Stiff linen canvas, hand-basted horsehair canvas, or heavy organza backing]

## III. Coupe & Architectural Blueprint
- **Length & Proportion**: [Explain how the cut honors the measuring specifications: ${measurementsDisplay}]
- **The Construction**: [Describe the shoulder padding, lapel details, hand-finished seams, and structural drapes]
- **Custom Fit Notes**: [State 1-2 specific structural tips for tailoring the silhouette for high comfort and high movement]

## IV. Accents & Luxury Metallic Hardware
- **Closures**: [e.g., Brushed gold frog fasteners, miniature polished gold buttons, hidden hand-basted gold zipper, or solid raw gold buckle]
- **Interior Secrets**: [e.g., Pure gold thread initials hand-stitched into the silk habotai inner pocket]

## V. Curation & Styling Guide
- **Coordinating Pieces**: [Minimalist accessories, footwear, outerwear]
- **Exclusivity Level**: Bespoke Haute Couture Piece. One-off creation by Atelier Noir & Or, Paris.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: `Create a custom couture outline of category "${category || 'Haute Couture'}" based on the following client preferences: "${prompt}". Cleanly consider measurements: ${measurementsDisplay}`,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        return res.json({ result: response.text });
      } else {
        // High-quality editorial fallback so the application is fully functional offline
        const categoryName = category || 'Bespose Couture';
        const creativeNames = [
          "Oeuvre No. 104 - Dusk Reflection Ligne",
          "Oeuvre No. 219 - Gilded Obsidian Blazer",
          "Oeuvre No. 308 - Liquid Champagne Column",
          "Oeuvre No. 412 - Velvet Eclipse Corsage"
        ];
        const selectedName = creativeNames[Math.floor(Math.random() * creativeNames.length)];

        const offlineBriefing = `# COUTURE PORTFOLIO: ${selectedName}

*Note: Demanded Offline/Simulated Atelier Mode due to unconfigured secret key.*

## I. L'Inspiration & Poetical Vision
A stunning synthesis of shadow and gold, designed specifically around your desire for *"${prompt}"*. It acts as a structural envelope, creating a modern outline that honors classical Paris fashion with contemporary minimalism.

## II. Les Matières (Fibers & Textures)
- **Primary Canvas**: **Triple-Weave Heavy Silk Morocain (Deep Noir)** - An dense, matte fabric that falls in clean structural arches and catches shadows with soft deep shifts.
- **Accents & Luminary**: **Champagne Gold Silk Lurex Thread** - Delicate hand-embroidered seams running vertically along the architecture of the piece.
- **Structure Support**: French hair-canvas basted entirely by hand to ensure a razor-sharp lapel and collar roll.

## III. Coupe & Architectural Blueprint
- **Length & Proportion**: Beautifully tailored to complement your proportions (${measurementsDisplay}). It presents a clean elongated vertical axis.
- **The Construction**: Structured padded shoulders with a soft roll, darted to sculpt the waistline without restricting comfort or high posture.
- **Custom Fit Notes**: Basted armholes cut slightly higher to guarantee full mobility while retaining the sharp aesthetic profile.

## IV. Accents & Luxury Metallic Hardware
- **Closures**: Four custom counter-sunk raw champagne gold buttons, cold-forged and finished with a subtle satin texture.
- **Interior Secrets**: Your custom initials "A.N.O." embroidered inside the breast pocket in genuine fine-gauge 18k gold thread.

## V. Curation & Styling Guide
- **Coordinating Pieces**: Raw silk black trousers, high-gloss pointed-toe noir pumps, and zero decorative jewelry—allowing the champagne gold stitching to stand alone.
- **Exclusivity Level**: Bespoke Atelier piece curated especially for Cassinonagamoto Client.`;

        return res.json({ result: offlineBriefing });
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Atelier stylist failed to formulate the blueprint: ' + err.message });
    }
  });

  // Client Static Files and Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atelier Noir & Or server gracefully executing on port ${PORT}`);
  });
}

// Start the full stack server
startServer().catch((err) => {
  console.error('Failed to initialize Atelier server:', err);
});
