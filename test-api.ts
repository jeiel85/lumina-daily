import { GoogleGenerativeAI } from "@google/generative-ai";

async function testImageGen() {
    const apiKey = "AIzaSyBo86Oz91EIlSFP35P4p0D-86xY7bzUbCA";
    
    console.log("--- Testing AI Image Generation (Imagen 4.0) ---");
    
    try {
        // Imagen models usually use the 'predict' method in Google Cloud, 
        // but for AI Studio Keys, we'll check if we can call it via a direct REST request.
        const modelName = "imagen-3"; // Trying standard Imagen version first as a candidate
        const prompt = "A beautiful minimalist forest landscape at sunset, cinematic lighting, 4k background";
        
        // Let's try the image generation endpoint if available for this key
        // In AI Studio, some keys have access to 'imagen-3' 
        
        const candidates = ["imagen-3", "imagen-3-fast", "imagen-4.0-generate-001"];
        
        for (const model of candidates) {
            console.log(`Trying ${model}...`);
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${apiKey}`;
            
            // Note: The structure for Imagen predict is different 
            const body = {
                instances: [{ prompt: prompt }],
                parameters: { sampleCount: 1, aspectRatio: "1:1" }
            };

            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await resp.json();
            
            if (data.predictions) {
                console.log(`🎯 SUCCESS with ${model}!! Image generated.`);
                console.log("Prediction length:", data.predictions.length);
                process.exit(0);
            } else {
                console.log(`   ${model} failed or no permission:`, JSON.stringify(data.error || data));
            }
        }

    } catch (e) {
        console.error("Image gen test error:", e);
    }
    console.log("❌ Failed to generate image via AI. Image generation might be restricted for this key.");
}

testImageGen();
