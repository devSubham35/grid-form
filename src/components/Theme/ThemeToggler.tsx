import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggler = () => {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-md cursor-pointer border"
    >
      {theme === 'light' ? (
        <Sun className="h-6 w-6 !text-yellow-600" />
      ) : (
        <Moon className="h-6 w-6 " />
      )}
    </Button>
  );
};

export default ThemeToggler;