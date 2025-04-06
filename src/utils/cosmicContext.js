// cosmicContext.js (mock version)
export function getEmpathyMap(message) {
    // Simulate generalized emotional interpretations
    const insights = [
        "The message might come across as dismissive, potentially alienating the recipient if they feel their emotions or concerns are being minimized.",
        "It could be interpreted as sarcasm or passive aggression, depending on the tone or context in which it’s delivered, which could lead to confusion or conflict.",
        "The message may trigger discomfort in sensitive discussions, especially if the topic involves personal or vulnerable subject matter, leading to potential disengagement or defensive reactions.",
        "There’s a chance of misunderstandings if the tone isn’t clear, as different cultural or age-based communication styles might interpret intent differently, resulting in unintended offense or confusion.",
        "Depending on the receiver's emotional state, the message could seem dismissive, even if that's not the sender’s intention, which may lead to strained communication and negatively affect the relationship.",
        "If the conversation involves differing viewpoints, the message could be seen as invalidating or undermining another person’s perspective, leading to a breakdown in constructive dialogue.",
        "The response may have unintended emotional consequences on someone who’s dealing with mental health struggles, potentially triggering feelings of isolation or frustration if empathy is not conveyed.",
        "This message could come off as disingenuous or evasive, especially if the receiver feels that it avoids addressing a core issue or emotion, which might hinder resolution in delicate situations.",
        "The lack of a clear, supportive tone could leave the recipient questioning whether the message is genuine or just a form of placation, possibly affecting trust in the interaction."
      ];
      
  
    const randomIndex = Math.floor(Math.random() * insights.length);
    const selectedInsight = insights[randomIndex];
  
    return { insights: [selectedInsight] }; // wrap in array to match expected structure
  }