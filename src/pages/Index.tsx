import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type Step = 'welcome' | 'promo' | 'select-type' | 'username' | 'sending' | 'success';
type RecipientType = 'bot' | 'user' | 'channel' | null;

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const [promoCode, setPromoCode] = useState('');
  const [recipientType, setRecipientType] = useState<RecipientType>(null);
  const [username, setUsername] = useState('');
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [thanksDialogOpen, setThanksDialogOpen] = useState(false);

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  useEffect(() => {
    if (step === 'sending') {
      const duration = 150000;
      const interval = 100;
      const increment = (interval / duration) * 100;
      
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStep('success'), 500);
            return 100;
          }
          return Math.min(prev + increment, 100);
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [step]);

  const handlePromoSubmit = () => {
    if (promoCode.toLowerCase() === 'ranalda228') {
      playSuccessSound();
      toast.success('Промокод активирован!', {
        description: 'Подписка успешно активирована',
      });
      setTimeout(() => setStep('select-type'), 1000);
    } else {
      toast.error('Неверный промокод', {
        description: 'Проверьте правильность ввода',
      });
    }
  };

  const handleTypeSelect = (type: RecipientType) => {
    setRecipientType(type);
    setStep('username');
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setStep('sending');
      setProgress(0);
    } else {
      toast.error('Введите username');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
          >
            <Icon name="Menu" size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-black/95 border-orange-500/30 backdrop-blur-sm"
        >
          <DropdownMenuItem
            className="text-white hover:bg-orange-500/20 hover:text-orange-400 cursor-pointer focus:bg-orange-500/20 focus:text-orange-400"
            onClick={() => {
              setThanksDialogOpen(true);
              setMenuOpen(false);
            }}
          >
            <Icon name="Heart" className="mr-2" size={16} />
            Привет от админа
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white hover:bg-orange-500/20 hover:text-orange-400 cursor-pointer focus:bg-orange-500/20 focus:text-orange-400"
            onClick={() => {
              navigate('/about');
              setMenuOpen(false);
            }}
          >
            <Icon name="Info" className="mr-2" size={16} />
            О работе пиццы
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white hover:bg-orange-500/20 hover:text-orange-400 cursor-pointer focus:bg-orange-500/20 focus:text-orange-400"
            onClick={() => {
              setStep('promo');
              setMenuOpen(false);
            }}
          >
            <Icon name="Ticket" className="mr-2" size={16} />
            Перейти к промокоду
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black"></div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 text-6xl">🍕</div>
        <div className="absolute top-40 right-20 text-8xl">🍕</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🍕</div>
        <div className="absolute bottom-40 right-1/3 text-5xl">🍕</div>
      </div>

      <Card className="relative z-10 w-full max-w-md bg-black/90 border-orange-500/30 backdrop-blur-sm">
        <div className="p-8">
          {step === 'welcome' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">🍕</div>
                <h1 className="text-4xl font-bold text-orange-500">Leonardo.pizza</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-4 text-center">
                <p className="text-white text-lg font-medium">
                  Приветствуем вас в Leonardo.pizza Telegram!
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  У нас есть доставка пиццы на ботов, пользователей и каналы, 
                  а также почтовая и веб пицца.
                </p>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-6">
                  <p className="text-orange-400 text-sm font-medium">
                    Для старта активируйте промокод, выданный вам админом
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setStep('promo')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold text-lg h-12"
              >
                Начать
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          )}

          {step === 'promo' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="text-5xl mb-4">🎟️</div>
                <h2 className="text-2xl font-bold text-orange-500 mb-2">Введите промокод</h2>
                <p className="text-gray-400 text-sm">Активируйте подписку</p>
              </div>

              <div className="space-y-4">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  className="bg-black/50 border-orange-500/30 focus:border-orange-500 text-white text-center text-lg h-12"
                  onKeyPress={(e) => e.key === 'Enter' && handlePromoSubmit()}
                />

                <Button 
                  onClick={handlePromoSubmit}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold h-12"
                >
                  Активировать
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep('welcome')}
                  className="w-full text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Назад
                </Button>
              </div>
            </div>
          )}

          {step === 'select-type' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-orange-500 mb-2">Выберите получателя</h2>
                <p className="text-gray-400 text-sm">Кому отправим пиццу?</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleTypeSelect('bot')}
                  className="w-full bg-black/50 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500 text-white h-14 justify-start text-left group"
                  variant="outline"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon name="Bot" className="group-hover:text-orange-500 transition-colors" size={24} />
                    <div>
                      <div className="font-semibold">Отправить на бота</div>
                      <div className="text-xs text-gray-400">Telegram бот</div>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleTypeSelect('user')}
                  className="w-full bg-black/50 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500 text-white h-14 justify-start text-left group"
                  variant="outline"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon name="User" className="group-hover:text-orange-500 transition-colors" size={24} />
                    <div>
                      <div className="font-semibold">Отправить на аккаунт</div>
                      <div className="text-xs text-gray-400">Telegram пользователь</div>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleTypeSelect('channel')}
                  className="w-full bg-black/50 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500 text-white h-14 justify-start text-left group"
                  variant="outline"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon name="Radio" className="group-hover:text-orange-500 transition-colors" size={24} />
                    <div>
                      <div className="font-semibold">Отправить на канал</div>
                      <div className="text-xs text-gray-400">Telegram канал</div>
                    </div>
                  </div>
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => setStep('promo')}
                className="w-full text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Назад
              </Button>
            </div>
          )}

          {step === 'username' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="text-5xl mb-4">
                  {recipientType === 'bot' && '🤖'}
                  {recipientType === 'user' && '👤'}
                  {recipientType === 'channel' && '📢'}
                </div>
                <h2 className="text-2xl font-bold text-orange-500 mb-2">Telegram username</h2>
                <p className="text-gray-400 text-sm">
                  Введите @username получателя
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  className="bg-black/50 border-orange-500/30 focus:border-orange-500 text-white text-center text-lg h-12"
                  onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
                />

                <Button 
                  onClick={handleUsernameSubmit}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold h-12"
                >
                  Отправить пиццу
                  <Icon name="Send" className="ml-2" size={18} />
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep('select-type')}
                  className="w-full text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Назад
                </Button>
              </div>
            </div>
          )}

          {step === 'sending' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">🍕</div>
                <h2 className="text-2xl font-bold text-orange-500 mb-2">Отправка пиццы</h2>
                <p className="text-gray-400 text-sm">
                  Отправляем на {username}
                </p>
              </div>

              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <div className="text-center text-orange-400 font-mono text-sm">
                  {Math.round(progress)}%
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <p className="text-center text-gray-300 text-sm">
                  Пожалуйста, подождите...
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="text-7xl mb-4">✅</div>
                <h2 className="text-3xl font-bold text-orange-500 mb-3">Успешно!</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Пицца отправлена на {username}
                </p>
                
                <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded-lg p-6">
                  <div className="text-5xl font-bold text-orange-500 mb-2">239 / 239</div>
                  <div className="text-gray-300 text-sm">пицц доставлено</div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setStep('select-type');
                  setUsername('');
                  setProgress(0);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold h-12"
              >
                Отправить ещё
                <Icon name="RotateCcw" className="ml-2" size={18} />
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep('welcome');
                  setPromoCode('');
                  setRecipientType(null);
                  setUsername('');
                  setProgress(0);
                }}
                className="w-full text-gray-400 hover:text-white hover:bg-white/5"
              >
                На главную
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="absolute bottom-4 text-center w-full text-gray-600 text-xs">
        Leonardo.pizza © 2024
      </div>

      <Dialog open={thanksDialogOpen} onOpenChange={setThanksDialogOpen}>
        <DialogContent className="bg-black/95 border-orange-500/30 backdrop-blur-sm text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-orange-500 text-center flex items-center justify-center gap-2">
              <Icon name="Heart" size={28} className="text-orange-500" />
              Привет от админа
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Особые благодарности
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 hover:bg-orange-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-3xl">👨‍💻</div>
                <div>
                  <p className="font-semibold text-orange-400">@zeytoz</p>
                  <p className="text-sm text-gray-300">Спасибо за поддержку!</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 hover:bg-orange-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🤝</div>
                <div>
                  <p className="font-semibold text-orange-400">Drekkorta</p>
                  <p className="text-sm text-gray-300">Передаю привет от leonardo.pizza</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 hover:bg-orange-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌊</div>
                <div>
                  <p className="font-semibold text-orange-400">Проект "Тихий омут"</p>
                  <p className="text-sm text-gray-300">За вдохновение и идеи!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-400 italic">
              Спасибо, что пользуетесь Leonardo.pizza! 🍕
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;