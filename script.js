document.addEventListener('DOMContentLoaded', () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    const emergencyMeetingButton = document.getElementById('emergency-meeting-button');
    const imposterKillButton = document.getElementById('imposter-kill');
    const susButton = document.getElementById('sus');
    const whereButton = document.getElementById('where');
    const votedOffButton = document.getElementById('voted-off');

    // Sound Synthesis Functions
    const playEmergencySound = () => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.5);
        osc.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 1.0);
        osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 1.5);
        osc.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 2.0);

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.0);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 2.0);
    };

    const playKillSound = () => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    const playSusSound = () => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        
        // Dissonant tritone
        const osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(141, audioCtx.currentTime); // ~Diminished 5th

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);

        osc.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc2.start();
        osc.stop(audioCtx.currentTime + 1.5);
        osc2.stop(audioCtx.currentTime + 1.5);
    };

    const playWhereSound = () => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    };

    const playVotedOffSound = () => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 2.0);

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.0);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 2.0);
    };

    // Add click listeners
    const addListener = (btn, soundFn) => {
        if(btn) {
            btn.addEventListener('click', () => {
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                soundFn();
            });
        }
    };

    addListener(emergencyMeetingButton, playEmergencySound);
    addListener(imposterKillButton, playKillSound);
    addListener(susButton, playSusSound);
    addListener(whereButton, playWhereSound);
    addListener(votedOffButton, playVotedOffSound);
});
