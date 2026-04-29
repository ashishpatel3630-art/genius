import { useState } from 'react';
import { generateImageWithStability } from '../lib/stability';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateImageWithStability(prompt);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            <span>AI Image Generation</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Powered by <span className="text-primary">Stability AI</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Describe your vision and watch it come to life
          </p>
        </div>

        {/* Generator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Describe your vision
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A majestic dog running on a beach at sunset..."
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-lg"
                rows={3}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon size={20} />
                  Generate
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl">
                {error}
              </div>
            )}

            {imageUrl && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-700">Generated Image:</h3>
                <img 
                  src={imageUrl} 
                  alt="Generated" 
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}