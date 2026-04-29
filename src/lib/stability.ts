import axios from 'axios';

const apiKey = import.meta.env.VITE_STABILITY_API_KEY || 'sk-AgEvNnaH3K2Rp3Mlps10KdQW9KKw0ilPJfblnLmALGEjjYGc';
const apiEndpoint = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export const generateImageWithStability = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('Stability AI API key is not configured. Please add VITE_STABILITY_API_KEY to your environment variables.');
  }

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    const artifacts = response.data.artifacts;
    if (!artifacts || artifacts.length === 0) {
      throw new Error('No image returned from Stability AI');
    }

    // Convert base64 to data URL
    const base64Image = artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${base64Image}`;

    return imageUrl;
  } catch (error: any) {
    console.error('Stability AI API Error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 
      'Failed to generate image with Stability AI. Please try again.'
    );
  }
};