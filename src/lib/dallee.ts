import axios from 'axios';

const apiKey = import.meta.env.VITE_DALLE3_API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/images/generations';

export const generateImageWithDallee = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('DALL-E 3 API key is not configured. Please add VITE_DALLE3_API_KEY to your environment variables.');
  }

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url',
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl = response.data.data[0].url;
    if (!imageUrl) {
      throw new Error('No image URL returned from DALL-E 3');
    }

    return imageUrl;
  } catch (error: any) {
    console.error('DALL-E 3 API Error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message || 
      'Failed to generate image with DALL-E 3. Please try again.'
    );
  }
};
