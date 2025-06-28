import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Sun, Moon, Globe, Shield, LogOut } from 'lucide-react';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const {
    language,
    setLanguage,
    translations
  } = useLanguage();
  const {
    isDarkMode,
    toggleTheme
  } = useTheme();
  const {
    user,
    signOut,
    isAdmin
  } = useAuth();
  const navItems = [{
    key: 'home',
    href: '#home'
  }, {
    key: 'about',
    href: '#about'
  }, {
    key: 'experience',
    href: '#experience'
  }, {
    key: 'projects',
    href: '#projects'
  }, {
    key: 'skills',
    href: '#skills'
  }, {
    key: 'education',
    href: '#education'
  }, {
    key: 'contact',
    href: '#contact'
  }];
  const languages = [{
    code: 'en',
    name: 'English',
    native: 'English'
  }, {
    code: 'hi',
    name: 'Hindi',
    native: 'हिंदी'
  }, {
    code: 'mr',
    name: 'Marathi',
    native: 'मराठी'
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  const handleAdminClick = () => {
    if (user && isAdmin) {
      setShowAdminPanel(true);
    } else {
      setShowAdminLogin(true);
    }
  };
  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };
  return <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-foreground">
              IS
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => <button key={item.key} onClick={() => scrollToSection(item.href)} className="transition-colors duration-200 font-medium text-zinc-50">
                  {translations.nav[item.key]}
                </button>)}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Admin Button */}
              <Button variant={user && isAdmin ? "default" : "outline"} size="sm" onClick={handleAdminClick} className="h-9">
                <Shield className="h-4 w-4 mr-2" />
                {user && isAdmin ? 'Admin Panel' : 'Admin'}
              </Button>

              {/* User Menu - Show if logged in */}
              {user && <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9">
                      {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>}

              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map(lang => <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className={language === lang.code ? 'bg-accent' : ''}>
                      {lang.native}
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <nav className="lg:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-2">
                {navItems.map(item => <button key={item.key} onClick={() => scrollToSection(item.href)} className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
                    {translations.nav[item.key]}
                  </button>)}
                
                {/* Mobile Admin Button */}
                <button onClick={handleAdminClick} className="text-left py-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  {user && isAdmin ? 'Admin Panel' : 'Admin Login'}
                </button>

                {/* Mobile Sign Out */}
                {user && <button onClick={handleSignOut} className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out ({user.user_metadata?.username || user.email?.split('@')[0]})
                  </button>}
              </div>
            </nav>}
        </div>
      </header>

      {/* Admin Login Modal */}
      {showAdminLogin && <AdminLogin onClose={() => setShowAdminLogin(false)} />}

      {/* Admin Panel */}
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
    </>;
};
export default Header;