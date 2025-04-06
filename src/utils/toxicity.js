const checkToxicity = async (text) => {
  try {
    const response = await fetch('http://localhost:5000/api/check-toxicity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Toxicity API failed');

    const result = await response.json();

    // ✅ Check for multiple toxic categories
    const toxicLabels = ['toxicity', 'insult', 'obscene', 'threat', 'identity_attack'];
    const isToxic = result[0]?.some(item =>
      toxicLabels.includes(item.label.toLowerCase()) && item.score > 0.7
    );

    return isToxic;

  } catch (error) {
    console.warn('⚠️ Using fallback detection (HuggingFace failed)');
    const toxicKeywords = [
      'idiot', 'stupid', 'hate', 'dumb', 'trash',
      'motherfucker', 'fuckface', 'dickhead', 'pissface', 'cockface',
      'shitbag', 'bastard', 'arsehole', 'fuckhead', 'fuckwit',
      'twathead', 'shitdick', 'dickwad', 'cockmunch', 'douchefag',
      'asswipe', 'prickface', 'fuckhole', 'pissfuck', 'shithead',
     'shitbrain', 'fuckbrain', 'assbrain',
      'assclown', 'shitclown', 'pissbucket', 'cumstain', 'jizzbag',
      'fucktoy', 'cumwhore', 'bitchboy', 'cockboy', 'twatboy',
      'dickboy', 'fuckboy', 'cumfuck', 'slutfucker', 'pissfucker',
      'shitfucker', 'assfucker', 'dumbshit', 'fuckingidiot', 'stupidfuck',
      'crazybitch', 'asslicker', 'fucklicker',
      'cumdump', 'cumdumpster',  'arsemonkey', 'fuckpuppet', 'fuckmaster',
      'pissmaster', 'shitmaster', 'whorebag', 'dicksniffer',
      'cocksniffer', 'pussysniffer', 'fucknugget', 'fuckbiscuit', 'assnugget',
      'dickbiscuit', 'twatcake', 'shithole', 'fuckhole', 'asshole',
      'shitshow', 'bitchass', 
    
      // Added toxic & sensitive terms used in online aggression
      'rape', 'rapist', 'porn', 'porno', 'pornhub', 'nude', 'nudes',
      'sex', 'sexy', 'orgy', 'bang', 'gangbang', 'fetish', 'horny',
      'slut', 'bitch', 'cunt', 'dildo', 'suck', 'sucking', 'jerk',
      'jerking', 'masturbate', 'masturbation', 'molest', 'molester',
      'ejaculate', 'erection', 'penis', 'vagina', 'boobs', 'tits',
      'nipples', 'ass', 'balls', 'dick', 'cock', 'thot', 'hoe',
      'escort', 'camgirl', 'stripping', 'strip', 'stripper', 'orgasm',
      'bangbros', 'redtube', 'xvideos', 'xnxx', 'onlyfans', 'adult',
      'hardcore', 'kinky', 'bdsm', 'creampie', 'anal', 'blowjob', 'handjob',
      'deepthroat', 'gagging', 'hentai', 'incest', 'pegging', 'rimjob', 'wet',
      'leak', 'leaked', 'expose', 'choke', 'abuse', 'harass', 'sexual', 'sexually',
      'grooming', 'predator', 'pedo', 'pedophile'
    ];
    return toxicKeywords.some(word =>
      text.toLowerCase().includes(word)
    );
  }
};

export default checkToxicity;


