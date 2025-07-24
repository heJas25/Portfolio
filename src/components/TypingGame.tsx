import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Zap, Trophy, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const cyberpunkPhrases = [
  "The matrix has you...",
  "Wake up, Neo.",
  "There is no spoon.",
  "Follow the white rabbit.",
  "Welcome to the machine.",
  "Hack the planet!",
  "I am the architect.",
  "The future is now.",
  "Code is poetry.",
  "Digital dreams await.",
  "Enter the cyber realm.",
  "Reality is an illusion.",
  "Data streams everywhere.",
  "The ghost in the shell.",
  "Artificial intelligence rises."
];

interface GameStats {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  isGameActive: boolean;
  currentPhrase: string;
  userInput: string;
  currentIndex: number;
  errors: number;
  totalTyped: number;
}

export const TypingGame = () => {
  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    timeLeft: 60,
    isGameActive: false,
    currentPhrase: '',
    userInput: '',
    currentIndex: 0,
    errors: 0,
    totalTyped: 0
  });

  const [showResults, setShowResults] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const gameInterval = useRef<NodeJS.Timeout>();
  const startTime = useRef<number>(0);

  const initializeGame = useCallback(() => {
    const randomPhrase = cyberpunkPhrases[Math.floor(Math.random() * cyberpunkPhrases.length)];
    setStats({
      wpm: 0,
      accuracy: 100,
      timeLeft: 60,
      isGameActive: false,
      currentPhrase: randomPhrase,
      userInput: '',
      currentIndex: 0,
      errors: 0,
      totalTyped: 0
    });
    setShowResults(false);
  }, []);

  const startGame = () => {
    setStats(prev => ({ ...prev, isGameActive: true, timeLeft: 60 }));
    startTime.current = Date.now();
    inputRef.current?.focus();
    
    gameInterval.current = setInterval(() => {
      setStats(prev => {
        if (prev.timeLeft <= 1) {
          endGame();
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const endGame = () => {
    setStats(prev => ({ ...prev, isGameActive: false }));
    setShowResults(true);
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    
    // Update best score
    const currentWpm = stats.wpm;
    if (currentWpm > bestScore) {
      setBestScore(currentWpm);
      localStorage.setItem('typingGameBestScore', currentWpm.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!stats.isGameActive) return;

    const value = e.target.value;
    const currentChar = stats.currentPhrase[stats.currentIndex];
    const typedChar = value[value.length - 1];

    setStats(prev => {
      let newErrors = prev.errors;
      let newIndex = prev.currentIndex;
      let newTotalTyped = prev.totalTyped + 1;

      if (typedChar === currentChar) {
        newIndex++;
      } else {
        newErrors++;
      }

      // Calculate WPM
      const timeElapsed = (Date.now() - startTime.current) / 1000 / 60; // in minutes
      const wordsTyped = newIndex / 5; // standard: 5 characters = 1 word
      const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

      // Calculate accuracy
      const accuracy = newTotalTyped > 0 ? Math.round(((newTotalTyped - newErrors) / newTotalTyped) * 100) : 100;

      // Check if phrase is completed
      if (newIndex >= prev.currentPhrase.length) {
        // Load new phrase
        const randomPhrase = cyberpunkPhrases[Math.floor(Math.random() * cyberpunkPhrases.length)];
        return {
          ...prev,
          currentPhrase: randomPhrase,
          userInput: '',
          currentIndex: 0,
          errors: newErrors,
          totalTyped: newTotalTyped,
          wpm,
          accuracy
        };
      }

      return {
        ...prev,
        userInput: value,
        currentIndex: newIndex,
        errors: newErrors,
        totalTyped: newTotalTyped,
        wpm,
        accuracy
      };
    });
  };

  useEffect(() => {
    initializeGame();
    
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('typingGameBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }

    return () => {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
    };
  }, [initializeGame]);

  const renderText = () => {
    return stats.currentPhrase.split('').map((char, index) => {
      let className = 'transition-all duration-200 ';
      
      if (index < stats.currentIndex) {
        className += 'text-primary bg-primary/20 ';
      } else if (index === stats.currentIndex) {
        className += 'text-foreground bg-accent/50 animate-pulse ';
      } else {
        className += 'text-muted-foreground ';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-noise opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-holographic bg-clip-text text-transparent mb-4">
            Cyber Typing Challenge
          </h2>
          <p className="text-muted-foreground text-lg">
            Test your typing speed in the matrix! 🚀⌨️
          </p>
        </motion.div>

        <Card className="p-8 cyber-border bg-card/90 backdrop-blur-sm">
          {/* Stats Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">{stats.wpm}</div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="text-2xl font-bold text-accent">{stats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="text-2xl font-bold text-destructive">{stats.timeLeft}s</div>
              <div className="text-sm text-muted-foreground">Time Left</div>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-bold text-secondary-foreground">{bestScore}</div>
              <div className="text-sm text-muted-foreground">Best Score</div>
            </div>
          </div>

          {/* Game Area */}
          <div className="mb-8">
            <div className="text-2xl font-mono leading-relaxed p-6 bg-background/50 rounded-lg border-2 border-dashed border-primary/30 min-h-[120px] flex items-center">
              {renderText()}
            </div>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <input
              ref={inputRef}
              type="text"
              value={stats.userInput}
              onChange={handleInputChange}
              disabled={!stats.isGameActive}
              placeholder={stats.isGameActive ? "Start typing..." : "Click Start to begin"}
              className="w-full p-4 text-lg font-mono bg-background border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none disabled:opacity-50 cyber-border"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!stats.isGameActive && !showResults && (
              <Button 
                onClick={startGame}
                variant="neon"
                size="lg"
                className="flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start Game
              </Button>
            )}
            
            <Button 
              onClick={initializeGame}
              variant="cyber"
              size="lg"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>

          {/* Results Modal */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              >
                <Card className="p-8 max-w-md w-full bg-card border-primary neon-glow">
                  <div className="text-center">
                    <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-6">Game Complete!</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span>Final WPM:</span>
                        <span className="font-bold text-primary">{stats.wpm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-bold text-accent">{stats.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Errors:</span>
                        <span className="font-bold text-destructive">{stats.errors}</span>
                      </div>
                      {stats.wpm > bestScore && (
                        <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <span className="text-primary font-bold">🎉 New Best Score!</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => setShowResults(false)}
                      variant="holographic"
                      className="w-full"
                    >
                      Close
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Card className="p-6 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Keyboard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">How to Play</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>🎯 Type the highlighted text as fast as possible</div>
              <div>⚡ Complete phrases to get new ones</div>
              <div>🏆 Beat your high score and improve your WPM</div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};