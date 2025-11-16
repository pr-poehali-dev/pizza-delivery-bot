import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black"></div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 text-6xl">🍕</div>
        <div className="absolute top-40 right-20 text-8xl">🍕</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🍕</div>
        <div className="absolute bottom-40 right-1/3 text-5xl">🍕</div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-50 text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
      >
        <Icon name="ArrowLeft" size={24} />
      </Button>

      <Card className="relative z-10 w-full max-w-2xl bg-black/90 border-orange-500/30 backdrop-blur-sm">
        <div className="p-8">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-7xl mb-4">🍕</div>
            <h1 className="text-4xl font-bold text-orange-500">О работе пиццы</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>

            <div className="space-y-6 text-left mt-8">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Zap" className="text-orange-500 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">
                      Быстрая доставка
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Leonardo.pizza доставляет качественную и быструю виртуальную пиццу. 
                      Мы делаем это быстро и эффективно!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Pizza" className="text-orange-500 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">
                      Огромный выбор
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      У нас можно заказать{' '}
                      <span className="text-orange-500 font-bold text-2xl">239 пицц</span>{' '}
                      различных видов для любого получателя в Telegram!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Target" className="text-orange-500 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">
                      Куда доставляем
                    </h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Icon name="Bot" size={18} className="text-orange-400" />
                        <span>Telegram боты</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={18} className="text-orange-400" />
                        <span>Пользователи Telegram</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Radio" size={18} className="text-orange-400" />
                        <span>Telegram каналы</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold text-lg h-12 mt-8"
            >
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Вернуться на главную
            </Button>
          </div>
        </div>
      </Card>

      <div className="absolute bottom-4 text-center w-full text-gray-600 text-xs">
        Leonardo.pizza © 2024
      </div>
    </div>
  );
};

export default About;
