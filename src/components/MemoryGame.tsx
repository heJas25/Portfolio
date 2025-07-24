import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Zap } from 'lucide-react';

// Game symbols
const symbols = ['🚀', '⚡', '🎮', '💎', '🔥', '⭐', '🎯', '🎨'];

interface GameCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame = () => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  // Initialize game
  const initializeGame = () => {
    const shuffledSymbols = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledSymbols);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setGameComplete(false);
    setTimer(0);
    setIsGameActive(true);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !gameComplete) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, gameComplete]);

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards[firstId];
        const secondCard = cards[secondId];

        if (firstCard.symbol === secondCard.symbol) {
          // Match found
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true } 
              : card
          ));
          setScore(prev => prev + 100);
          
          // Check if game is complete
          const updatedCards = cards.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true } 
              : card
          );
          
          if (updatedCards.every(card => card.isMatched)) {
            setGameComplete(true);
            setIsGameActive(false);
            setScore(prev => prev + Math.max(0, 1000 - timer * 10)); // Time bonus
          }
        } else {
          // No match - flip back
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false } 
              : card
          ));
        }
        
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 px-4 min-h-screen bg-gradient-dark flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gradient-primary">
            Memory Matrix
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Test your memory skills in this cyberpunk-themed matching game!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="cyber-border p-6">
              <h3 className="text-xl font-semibold mb-4 text-gradient-secondary">Game Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Moves
                  </span>
                  <span className="font-mono text-lg">{moves}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    Score
                  </span>
                  <span className="font-mono text-lg text-primary">{score}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Time</span>
                  <span className="font-mono text-lg">{formatTime(timer)}</span>
                </div>
              </div>

              <Button 
                onClick={initializeGame}
                variant="cyber"
                className="w-full mt-6"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Game
              </Button>
            </Card>
          </motion.div>

          {/* Game Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="cyber-border p-6">
              <div className="grid grid-cols-4 gap-3">
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`
                      aspect-square relative cursor-pointer rounded-lg
                      ${card.isMatched 
                        ? 'bg-gradient-primary' 
                        : card.isFlipped 
                          ? 'bg-gradient-secondary' 
                          : 'bg-muted/30 hover:bg-muted/50'
                      }
                      transition-all duration-300 cyber-border
                    `}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ rotateY: 0 }}
                    animate={{ 
                      rotateY: card.isFlipped || card.isMatched ? 180 : 0 
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {card.isFlipped || card.isMatched ? (
                          <motion.span
                            key="symbol"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl"
                            style={{ transform: 'rotateY(180deg)' }}
                          >
                            {card.symbol}
                          </motion.span>
                        ) : (
                          <motion.div
                            key="back"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-2xl text-muted-foreground"
                          >
                            ?
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Glow effect for matched cards */}
                    {card.isMatched && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-primary/20"
                        animate={{ 
                          boxShadow: [
                            '0 0 0px hsl(var(--primary))',
                            '0 0 20px hsl(var(--primary))',
                            '0 0 0px hsl(var(--primary))'
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity 
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Game Complete Modal */}
        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <Card className="cyber-border p-8 max-w-md text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4"
                  >
                    🏆
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
                    Mission Complete!
                  </h3>
                  
                  <div className="space-y-2 mb-6 text-left">
                    <div className="flex justify-between">
                      <span>Final Score:</span>
                      <span className="font-mono text-primary">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moves:</span>
                      <span className="font-mono">{moves}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-mono">{formatTime(timer)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={initializeGame}
                    variant="neon"
                    className="w-full"
                  >
                    Play Again
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};