export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只允许 POST 请求' });
    }

    // 这里读取的是环境变量，密钥不会暴露在代码里
    const API_KEY = process.env.DIFY_API_KEY; 

    try {
        const difyResponse = await fetch('https://api.dify.ai/v1/chat-messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {},
                query: req.body.query, 
                response_mode: "blocking",
                conversation_id: "",
                user: "vercel-visitor" 
            })
        });

        const data = await difyResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: '服务器请求失败' });
    }
}
