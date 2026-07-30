const axios = require("axios");

const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // ex: disdev_verify_2026
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports = async (req, res) => {
  // 1. Vérification du webhook (GET) — Facebook appelle ça une seule fois à la config
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send("Forbidden");
  }

  // 2. Réception des messages (POST)
  if (req.method === "POST") {
    const body = req.body;

    if (body.object === "page") {
      for (const entry of body.entry) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;

        if (event.message && event.message.text) {
          const text = event.message.text.toLowerCase();
          const reply = getReply(text);
          await sendMessage(senderId, reply);
        }
      }
      return res.status(200).send("EVENT_RECEIVED");
    }
    return res.status(404).send("Not Found");
  }

  return res.status(405).send("Method Not Allowed");
};

function getReply(text) {
  if (text.includes("prix") || text.includes("devis")) {
    return "Pour un devis, dis-nous : ton nom, le type de projet, et une brève description. On te répond vite ! 🚀";
  }
  if (text.includes("site") || text.includes("web")) {
    return "On crée des sites web sur mesure ! Regarde nos réalisations ici : https://dis-s-dev.vercel.app";
  }
  if (text.includes("ia") || text.includes("intelligence")) {
    return "On développe aussi des solutions IA personnalisées. Dis-nous en plus sur ton besoin !";
  }
  return "Bonjour et bienvenue chez Dis's Dev 👋 ! Comment pouvons-nous t'aider aujourd'hui ? (site web, IA, devis...)";
}

async function sendMessage(recipientId, text) {
  await axios.post(
    `https://graph.facebook.com/v21.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      recipient: { id: recipientId },
      message: { text },
    }
  );
}