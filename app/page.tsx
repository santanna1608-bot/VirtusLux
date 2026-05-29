'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  ShieldAlert, 
  Compass, 
  Users, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  User, 
  CheckCircle, 
  Lock, 
  Zap, 
  Eye, 
  Layers, 
  Workflow, 
  Send,
  Loader2,
  Bell,
  Activity,
  LogOut,
  Sliders,
  MessageSquare,
  HelpCircle,
  Check,
  X
} from 'lucide-react';

// Triangular Virtus Lux Logo imported from the divine source SVG
const GoldTriangleLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
  <div className={`relative ${className} transition-all duration-500`}>
    <Image 
      src="https://destromago.com/wp-content/uploads/2025/08/virtus-lux.svg"
      alt="Virtus Lux Logo"
      fill
      className="object-contain"
      referrerPolicy="no-referrer"
      priority
    />
  </div>
);

// Helper function to parse simple Markdown returned by Gemini securely
const parseOracleMarkdown = (text: string) => {
  return text.split('\n').filter(Boolean).map((line, idx) => {
    const cleanLine = line.trim();
    const isBullet = cleanLine.startsWith('*') || cleanLine.startsWith('-');
    const textContent = isBullet ? cleanLine.substring(1).trim() : cleanLine;

    // Split by **text**
    const parts = textContent.split(/\*\*(.*?)\*\*/g);
    const renderedElements = parts.map((part, pIdx) => {
      if (pIdx % 2 === 1) {
        return <strong key={pIdx} className="text-gold-light font-bold font-serif">{part}</strong>;
      }
      return part;
    });

    if (isBullet) {
      return (
        <li key={idx} className="flex items-start gap-2 text-gray-350 ml-2 sm:ml-4 text-xs sm:text-sm my-1">
          <span className="text-gold mt-1 text-[10px] sm:text-xs">✦</span>
          <span>{renderedElements}</span>
        </li>
      );
    }

    return (
      <p key={idx} className="text-gray-300 text-xs sm:text-base leading-relaxed my-2">
        {renderedElements}
      </p>
    );
  });
};

export default function VirtusLuxApp() {
  // Navigation: 'landing' (sales page) or 'crm' (active client control panel)
  const [activeTab, setActiveTab] = useState<'landing' | 'crm'>('landing');
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberName, setSubscriberName] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  
  // Oraculo Form State
  const [oracleName, setOracleName] = useState('');
  const [oracleArea, setOracleArea] = useState('Financeiro');
  const [oracleDetail, setOracleDetail] = useState('');
  const [oracleLoading, setOracleLoading] = useState(false);
  const [oracleResponse, setOracleResponse] = useState<string | null>(null);

  // Altar Interactive States
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true, false, false]);
  const [altarFocus, setAltarFocus] = useState<string>('Prosperidade Geral');
  const [solarCarouselIndex, setSolarCarouselIndex] = useState<number>(0);

  // FAQ Interactive States (Accordion IDs opened)
  const [openedFaq, setOpenedFaq] = useState<number | null>(0);

  // CRM Simulation States
  const [newManifestTarget, setNewManifestTarget] = useState('');
  const [newManifestArea, setNewManifestArea] = useState('Abertura de Caminhos');
  const [customManifests, setCustomManifests] = useState([
    { id: 1, target: "Remoção de bloqueios na conta bancária PJ", area: "Abertura de Caminhos", status: "Conectado", date: "28/05/2026" },
    { id: 2, target: "Escudo áureo contra inveja profissional estrutural", area: "Proteção Contínua", status: "Canalizando", date: "28/05/2026" }
  ]);

  // Live Altar Telemetry logs
  const [ritualLogs, setRitualLogs] = useState<string[]>([
    "[12:10:04] Templo Virtus Lux: Acendendo egrégora do portal do Sol Invictus.",
    "[12:08:22] Alinhamento: Ondas de frequência em 528Hz canalizadas para o quadrante financeiro.",
    "[12:05:11] Transmutações: Destro Mago iniciou defumação ritual de mirra e breu branco.",
    "[12:00:00] Assinatura Coletiva: Egrégora blindada operando sob a lua minguante protetora."
  ]);

  // Keep adding live ritual logs to simulate active CRM action
  useEffect(() => {
    const logInterval = setInterval(() => {
      const areas = ["Caminhos", "Escudo Protetor", "Quebra de Amarras", "Prosperidade Áurea", "Limpeza Sutil"];
      const messages = [
        `Atualização de frequência: Ondas sutis enviadas para membros no pilar de ${areas[Math.floor(Math.random() * areas.length)]}.`,
        "O magista Destro Mago inseriu novas runas de ativação no triângulo sagrado.",
        "Limpeza de miasmas e formas-pensamento coletivas concluída com sucesso.",
        "Potência energética elevada para o nível de ressonância cabalística de Geburah.",
        "Oração cabalística realizada: Proteção dos 72 nomes divinos ativa para todos os assinantes."
      ];
      const time = new Date().toLocaleTimeString('pt-BR');
      const randomMsg = `[${time}] ${messages[Math.floor(Math.random() * messages.length)]}`;
      setRitualLogs(prev => [randomMsg, ...prev.slice(0, 5)]);
    }, 12000);

    return () => clearInterval(logInterval);
  }, []);

  // Alternar as imagens do carrossel automaticamente a cada 4.5 segundos
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setSolarCarouselIndex(prev => (prev === 2 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(slideInterval);
  }, []);

  // Handle subscriber checkout submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberName || !subscriberEmail) return;
    
    setIsActivating(true);
    
    setTimeout(() => {
      setIsSubscribed(true);
      setIsActivating(false);
      setActiveTab('crm');
      
      // Add custom welcome log
      const time = new Date().toLocaleTimeString('pt-BR');
      setRitualLogs(prev => [
        `[${time}] Egrégora: Canalização ativada com sucesso para o novo membro ${subscriberName}!`,
        ...prev
      ]);
      
      // Real Hotmart Checkout Redirect requested by the user
      window.location.href = "https://pay.hotmart.com/S101615269G";
    }, 2000);
  };

  // Add a manifest target on CRM
  const handleAddManifest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newManifestTarget.trim()) return;
    
    const newManifestItem = {
      id: Date.now(),
      target: newManifestTarget,
      area: newManifestArea,
      status: 'Canalizando' as const,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setCustomManifests([newManifestItem, ...customManifests]);
    setNewManifestTarget('');

    const time = new Date().toLocaleTimeString('pt-BR');
    setRitualLogs(prev => [
      `[${time}] Alinhamento Individual: Destro Mago recebeu intenção de "${newManifestTarget}" no altar.`,
      ...prev
    ]);
  };

  // Toggle index of FAQ
  const toggleFaq = (index: number) => {
    setOpenedFaq(openedFaq === index ? null : index);
  };

  // Toggle active lit candles state on Interactive Altar
  const toggleCandle = (idx: number) => {
    const nextArr = [...litCandles];
    nextArr[idx] = !nextArr[idx];
    setLitCandles(nextArr);
  };

  const activeCandlesCount = litCandles.filter(Boolean).length;
  const altarPowerRatio = Math.round((activeCandlesCount / litCandles.length) * 100);

  // Open WhatsApp with Oracle details immediately
  const handleConsultOracle = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedText = `Olá Destro Mago! Solicitei a sintonização do Oráculo Virtus Lux e gostaria de realizar o Jogo Completo com Tarô e Baralho Cigano (R$100,00).\n\n*Nome:* ${oracleName || "Buscador de Luz"}\n*Área:* ${oracleArea}\n*Situação:* ${oracleDetail}`;
    const url = `https://wa.me/5534999217444?text=${encodeURIComponent(formattedText)}`;
    
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen selection:bg-gold selection:text-black antialiased relative overflow-hidden font-sans">
      
      {/* Editorial Vertical Accent Lines (Prestige Motif) */}
      <div className="absolute right-12 top-0 bottom-0 accent-line-v opacity-10 pointer-events-none hidden xl:block" />
      <div className="absolute left-12 top-0 bottom-0 accent-line-v opacity-10 pointer-events-none hidden xl:block" />

      {/* Dynamic Gold/Twilight Background FX (Ambient luxurious glow) */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-b from-gold-dark/15 to-transparent rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-200px] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[1600px] right-[-100px] w-[500px] h-[500px] bg-gold-light/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header & Luxury Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 border-b border-gold-30/15 bg-gradient-to-b from-[#050505] via-[#050505]/98 to-[#050505]/92 backdrop-blur-md z-50 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => {
              setActiveTab('landing');
              setTimeout(() => {
                const section = document.getElementById('hero');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }, 55);
            }} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <GoldTriangleLogo className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-105" />
            <div className="text-left">
              <span className="font-serif text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.25em] text-gold-light font-bold block leading-none">VIRTUS LUX</span>
              <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gold-dark font-mono block mt-0.5 sm:mt-1">Egrégora &bull; Salomônica</span>
            </div>
          </div>

          {/* Tab Selector Nav & CRM Access */}
          <div className="flex items-center gap-1.5 sm:gap-3 font-sans text-[10px] sm:text-xs">
            <button
              onClick={() => {
                setActiveTab('landing');
                setTimeout(() => {
                  const section = document.getElementById('hero');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }, 55);
              }}
              className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 cursor-pointer active:scale-95 ${
                activeTab === 'landing' 
                ? 'bg-gradient-to-r from-gold-dark via-gold to-amber-500 text-black border-gold-light font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.45)]' 
                : 'border-gold-30/10 text-gray-400 hover:text-white hover:border-gold-30/40 bg-zinc-950/20'
              }`}
            >
              Ritual e Benefícios
            </button>
            <button
              onClick={() => {
                if (!isSubscribed) {
                  const section = document.getElementById('assinatura-secao');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('crm');
                }
              }}
              className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 ${
                activeTab === 'crm' 
                ? 'bg-gradient-to-r from-gold-dark via-gold to-amber-500 text-black border-gold-light font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.45)]' 
                : 'border-gold-30/10 text-gray-400 hover:text-gold hover:border-gold-30/40 bg-zinc-950/20'
              }`}
            >
              {isSubscribed ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Portal do Iniciado
                </>
              ) : (
                <>
                  <Lock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gold-light" />
                  Portal do Iniciado
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEW CONTROLLER WITH SCROLL SPACING */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-8 md:pt-36 md:pb-16 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LANDING PAGE (APRESENTAÇÃO SAGRADA) */}
          {activeTab === 'landing' && (
            <motion.div
              key="landing-tabs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-24"
            >
              
              {/* SECTION 1: HERO (DOBRA INICIAL - Exact Layout of Header & Text in image) */}
              <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 md:pt-10 w-full">
                
                {/* Visual Triangle Logo Frame Left */}
                <div className="lg:col-span-6 flex justify-center items-stretch order-2 lg:order-1 w-full">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: [0, -8, 0]
                    }}
                    transition={{
                      scale: { duration: 0.6, ease: "easeOut" },
                      opacity: { duration: 0.6, ease: "easeOut" },
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      borderColor: "rgba(212, 175, 55, 0.70)",
                      boxShadow: "0 0 80px rgba(212, 175, 55, 0.40)",
                    }}
                    className="relative w-full min-h-[460px] lg:min-h-[540px] p-10 bg-gradient-to-b from-gold/20 via-gold/5 to-transparent rounded-3xl border-2 border-gold/30 flex flex-col items-center justify-center gap-10 shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden text-center cursor-pointer transition-all duration-500 ease-out group"
                  >
                    {/* Glowing golden halo rings behind logo with pulse effect */}
                    <div className="absolute w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/25 transition-all duration-700 ease-out" />
                    
                    {/* Golden cosmic border pulse effect */}
                    <div className="absolute inset-0 bg-radial-gradient-candle opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out pointer-events-none" />
                    
                    <GoldTriangleLogo className="w-72 h-72 md:w-96 md:h-96 filter drop-shadow-[0_0_35px_rgba(212,175,55,0.5)] group-hover:drop-shadow-[0_0_55px_rgba(212,175,55,0.8)] relative z-10 transition-all duration-500 ease-out group-hover:scale-105" />
                    
                    <div className="space-y-1 relative z-10">
                      <span className="text-[10px] text-gold-light tracking-[0.35em] font-mono uppercase block group-hover:text-gold transition-colors duration-300">
                        VIRTUS LUX
                      </span>
                      <span className="text-[8px] text-zinc-500 tracking-[0.25em] font-mono uppercase block group-hover:text-zinc-400 transition-colors duration-300">
                        Egrégora Activa &bull; MXXVI
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Main Copy Right */}
                <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05] text-white">
                    Participe de Rituais Coletivos Poderosos para <span className="text-gold-light font-medium italic block">Transformar sua Vida</span>
                  </h1>
                  
                  <p className="text-gray-300 font-sans text-base md:text-lg leading-relaxed max-w-3xl">
                    O Virtus Lux conecta você a forças espirituais de alta potência para abrir caminhos, atrair prosperidade e remover obstáculos. Operações conduzidas com rigor mágico e alinhadas à sua intenção, mesmo que você não entenda nada de rituais, nós cuidamos de tudo para você.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a 
                      href="#assinatura-secao"
                      className="px-8 py-4.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-amber-500 text-black font-extrabold text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] shadow-lg active:scale-95 flex items-center justify-center gap-2 border border-gold-light/40"
                    >
                      Quero assinar agora <ArrowRight className="w-4 h-4 animate-pulse" />
                    </a>
                    <a 
                      href="#oraculo"
                      className="px-8 py-4.5 rounded-xl text-gray-300 border border-gold-30/20 bg-black/40 font-bold text-xs uppercase tracking-[0.25em] hover:text-gold-light hover:border-gold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                    >
                      Experiência Espiritual
                    </a>
                  </div>
                </div>

              </section>

              {/* SECTION 2: BENEFÍCIOS EXCLUSIVOS */}
              <section className="space-y-10 w-full py-6 border-t border-gold-30/10">
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-gold font-mono block">Acesso Privado</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-normal text-white text-center">
                    Esses são os rituais e benefícios exclusivos que você terá acesso como assinante do <span className="text-gold italic font-medium">Virtus Lux</span>:
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {[
                    "Participação garantida em todos os ritos coletivos do mês sem custo adicional.",
                    "Rituais semanais com forças angelicais e planetárias, cada um focado em áreas específicas como prosperidade, amor, proteção e limpeza espiritual.",
                    "Proteção espiritual contínua enquanto sua assinatura estiver ativa.",
                    "Quebra de bloqueios e abertura de caminhos para acelerar resultados.",
                    "Acompanhamento energético mensal, com ajustes e reforços quando necessário.",
                    "Intenções personalizadas para cada rito, alinhadas com seus objetivos pessoais.",
                    "Acesso antecipado a rituais especiais e oportunidades exclusivas.",
                    "Condições especiais para participar de ritos individuais com valor reduzido."
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-black/40 border border-gold-30/10 hover:border-gold-30/30 transition-all duration-300">
                      <span className="text-gold font-bold mt-1">✓</span>
                      <p className="text-sm text-gray-300 leading-relaxed font-sans">{benefit}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3: RITUAL DESIGN CARDS & IMMERSIVE INTERACTIVE ALTAR (Corresponds directly to the altar photo) */}
              <section className="space-y-12">
                <div className="text-center w-full space-y-3 mb-8">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold-light to-gold text-center uppercase tracking-wider drop-shadow-sm">
                    Abertura de Caminhos Solar
                  </h2>
                  <p className="text-gold-light/80 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mt-2 text-center">
                    Com Michael, Nakhiel e Och
                  </p>
                </div>

                {/* HIGH FIDELITY REAL ALTAR VIDEO AS REQUESTED */}
                <div className="max-w-4xl mx-auto my-8 relative w-full">
                  {/* Subtle solar orange-gold dynamic light blur behind */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 via-gold/25 to-amber-500/15 rounded-3xl blur-2xl opacity-40 animate-pulse pointer-events-none" />
                  
                  <div className="relative rounded-2xl overflow-hidden border border-gold-30/30 shadow-[0_0_50px_rgba(212,175,55,0.25)] bg-[#050505]">
                    <video 
                      src="https://destromago.com/wp-content/uploads/2025/08/copy_32650797-6F5E-4BAA-B4F3-C961A5CEB884.mov"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full h-auto object-cover max-h-[520px]"
                    />
                  </div>
                </div>

                {/* DYNAMIC PREMIUM IMAGE CAROUSEL WITH SPECIFIED IMAGES */}
                <div className="max-w-xl mx-auto my-12 relative w-full px-4">
                  <div className="text-center mb-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block">Consagrações do Templo</span>
                    <span className="text-xs text-gray-400 block mt-1">Navegue pelas artes planetárias de abertura solar</span>
                  </div>

                  {/* Carousel Card Frame with Glowing Solar Gradient */}
                  <div className="relative aspect-[1080/1350] w-full rounded-2xl overflow-hidden border border-gold-30/30 shadow-[0_0_40px_rgba(212,175,55,0.18)] bg-[#050505] group">
                    
                    {/* Glow Pedestal behind the image */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={solarCarouselIndex}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={
                            [
                              "https://destromago.com/wp-content/uploads/2025/08/ABERTURA-DE-CAMINHOS-1080-x-1350-px.zip-4-scaled.png",
                              "https://destromago.com/wp-content/uploads/2025/08/ABERTURA-DE-CAMINHOS-1080-x-1350-px.zip-3-scaled.png",
                              "https://destromago.com/wp-content/uploads/2025/08/ABERTURA-DE-CAMINHOS-1080-x-1350-px.zip-5-scaled.png"
                            ][solarCarouselIndex]
                          }
                          alt={`Arte de Manifestação Solar ${solarCarouselIndex + 1}`}
                          fill
                          className="object-contain p-4 rounded-2xl"
                          referrerPolicy="no-referrer"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Left & Right Luxurious Navigation Arrows with Gold Hover Gradients */}
                    <button
                      onClick={() => setSolarCarouselIndex(prev => (prev === 0 ? 2 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/75 hover:bg-gradient-to-r hover:from-gold hover:to-amber-500 text-gold-light hover:text-black border border-gold-30/20 active:scale-90 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] z-20 group"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => setSolarCarouselIndex(prev => (prev === 2 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/75 hover:bg-gradient-to-r hover:from-gold hover:to-amber-500 text-gold-light hover:text-black border border-gold-30/20 active:scale-90 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] z-20 group"
                      aria-label="Próximo"
                    >
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Numeric tracking badge in gold design */}
                    <div className="absolute top-4 right-4 py-1 px-3 rounded-full bg-black/80 border border-gold-30/20 text-[9px] font-mono tracking-widest text-gold-light font-bold">
                      {solarCarouselIndex + 1} &bull; 3
                    </div>
                  </div>

                  {/* Bullet indicators styled with elegant Gold gradients */}
                  <div className="flex justify-center items-center gap-2.5 mt-5">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        onClick={() => setSolarCarouselIndex(i)}
                        className={`transition-all duration-350 rounded-full h-2 ${
                          solarCarouselIndex === i 
                            ? 'w-7 bg-gradient-to-r from-gold-light via-gold to-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]' 
                            : 'w-2 bg-zinc-750 hover:bg-zinc-600'
                        }`}
                        title={`Ir para arte ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-8 border-t border-gold-30/10 mt-12 w-full">
                  
                  {/* Left Column: A Teurgia e Forças Ativas */}
                  <div className="space-y-6 flex flex-col justify-between h-full">
                    <div className="glass-card p-6 rounded-3xl border border-gold-30/15 bg-black/40 space-y-6 text-left flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                          <h3 className="font-serif text-2xl font-normal text-gold-light italic">A Teurgia e Forças Celestes</h3>
                        </div>
                        <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
                          O ritual de Abertura de Caminhos Solar não é um passe de mágica genérico. É uma operação cabalística de alta teurgia que sintoniza as correntes inteligentes do Sol (Tiphereth) para magnetizar prestígio, realeza, prosperidade e abertura financeira real em sua vida.
                        </p>

                        <div className="space-y-4">
                          {/* Force 1 */}
                          <div className="p-4 rounded-2xl bg-gold-dark/5 border border-gold-30/10 space-y-1.5 animate-fade-in">
                            <h4 className="font-serif text-sm font-semibold text-white flex justify-between">
                              <span>Arcanjo Michael</span>
                              <span className="text-[10px] font-mono text-gold-dark uppercase tracking-widest">Regente Solar</span>
                            </h4>
                            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                              O comandante das hostes celestes e guardião da esfera solar. Traz autoridade, brilho pessoal, prestígio público e um escudo impenetrável que dissolve invejas profissionais e quebra demandas estruturais.
                            </p>
                          </div>

                          {/* Force 2 */}
                          <div className="p-4 rounded-2xl bg-gold-dark/5 border border-gold-30/10 space-y-1.5 animate-fade-in">
                            <h4 className="font-serif text-sm font-semibold text-white flex justify-between">
                              <span>Espírito Olímpico Och</span>
                              <span className="text-[10px] font-mono text-gold-dark uppercase tracking-widest">Gênio Planetário</span>
                            </h4>
                            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                              O governante das coisas do Sol na tradição mágica medieval. Concede ouro físico, riqueza material ativa, saúde vitalizada e magnetiza oportunidades de negócios com pessoas influentes e prósperas.
                            </p>
                          </div>

                          {/* Force 3 */}
                          <div className="p-4 rounded-2xl bg-gold-dark/5 border border-gold-30/10 space-y-1.5 animate-fade-in">
                            <h4 className="font-serif text-sm font-semibold text-white flex justify-between">
                              <span>Inteligência Nakhiel</span>
                              <span className="text-[10px] font-mono text-gold-dark uppercase tracking-widest">Matemática Divina</span>
                            </h4>
                            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                              A inteligência cabalística numérica cujo valor de sigilo soma 561 (número místico do Sol). Nakhiel estabiliza as forças do Sol para que as conquistas materiais assentem em bases seguras e perenes.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom subtitle/attributes or labels to enhance beauty */}
                      <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-gold-30/10">
                        <div className="text-center py-2 px-3 rounded-lg bg-black/60 border border-gold-30/5">
                          <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono block">Frequência Cósmica</span>
                          <span className="text-[10px] font-medium text-gold font-mono">528Hz &bull; Sol</span>
                        </div>
                        <div className="text-center py-2 px-3 rounded-lg bg-black/60 border border-gold-30/5">
                          <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono block">Pilar Cabalístico</span>
                          <span className="text-[10px] font-medium text-gold font-mono">Tiphereth (Beleza)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Operações no Altar Físico Real */}
                  <div className="space-y-6 flex flex-col justify-between h-full">
                    <div className="glass-card p-6 rounded-3xl border border-gold-30/15 bg-black/40 space-y-6 text-left flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Flame className="w-5 h-5 text-gold animate-pulse" />
                          <h3 className="font-serif text-2xl font-normal text-gold-light italic">A Ritualística no Altar Real</h3>
                        </div>
                        <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
                          Como visto no vídeo real acima, a magia não é simulada ou figurativa. O magista Destro Mago realiza pessoalmente as operações físicas de consagração no templo, seguindo ritos tradicionais rigorosos para cada participante do círculo.
                        </p>

                        <div className="space-y-4">
                          {/* Step 1 */}
                          <div className="flex gap-4 items-start p-3 bg-white/2 rounded-xl border border-white/5">
                            <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold-30/25 flex items-center justify-center font-mono text-xs text-gold font-bold flex-shrink-0 mt-0.5">
                              01
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-serif font-bold text-white">Inscrição de Nomes e Objetivos</h4>
                              <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                                Seu nome completo, data de nascimento e objetivos financeiros ou materiais são transcritos manualmente com tintas consagradas e colocados sob os grandes sigilos de metal e pantáculos ativos no centro do altar.
                              </p>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="flex gap-4 items-start p-3 bg-white/2 rounded-xl border border-white/5">
                            <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold-30/25 flex items-center justify-center font-mono text-xs text-gold font-bold flex-shrink-0 mt-0.5">
                              02
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-serif font-bold text-white">Ignição por Velas de Cera de Abelha</h4>
                              <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                                Não utilizamos parafina industrial (derivado de petróleo). Os ritos solares usam apenas velas artesanais de cera pura de abelha silvestre, que detêm a vibração solar vital e o aroma consagrado que atrai os dæmons benéficos.
                              </p>
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="flex gap-4 items-start p-3 bg-white/2 rounded-xl border border-white/5">
                            <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold-30/25 flex items-center justify-center font-mono text-xs text-gold font-bold flex-shrink-0 mt-0.5">
                              03
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-serif font-bold text-white">Evocação Zodiacal Horária</h4>
                              <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                                Os ritos coletivos ocorrem estritamente nos dias e horas astrológicos do Sol (domingos e horas solares específicas). Forças estelares e conjunções são calculadas para injetar potência máxima nas chaves de liberação de dinheiro.
                              </p>
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="flex gap-4 items-start p-3 bg-white/2 rounded-xl border border-white/5">
                            <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold-30/25 flex items-center justify-center font-mono text-xs text-gold font-bold flex-shrink-0 mt-0.5">
                              04
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-serif font-bold text-white">Ancoramento Semanal Contínuo</h4>
                              <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                                As oferendas solares e os elos vibratórios permanecem fisicamente no templo de Destro Mago ao longo de todo o tempo da assinatura, criando um link de irradiação contínua para sua rotina e carteira profissional.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Side indications to complete aesthetics */}
                      <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-gold-30/10">
                        <div className="text-center py-2 px-3 rounded-lg bg-black/60 border border-gold-30/5">
                          <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono block">Insumos Utilizados</span>
                          <span className="text-[10px] font-medium text-gold font-mono">Cera de Abelha &bull; Ouro &bull; Resinas</span>
                        </div>
                        <div className="text-center py-2 px-3 rounded-lg bg-black/60 border border-gold-30/5">
                          <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono block">Magia Prática</span>
                          <span className="text-[10px] font-medium text-gold font-mono">Altar Real &bull; Sem Simulações</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Sub-altar detailed description of philosophy */}
                <div className="w-full text-center space-y-4 pt-4 border-t border-gold-10/10 flex flex-col items-center">
                  <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed">
                    Não importa qual seja o seu objetivo, o <span className="text-gold font-serif">Virtus Lux</span> molda a energia dos rituais para atender às suas necessidades, seja para prosperidade, amor, proteção, limpeza espiritual ou abertura de caminhos. Cada trabalho é planejado para alinhar a força espiritual diretamente com o que você busca manifestar, garantindo que a energia entregue seja precisa e eficaz.
                  </p>

                  {/* Sacred altar/manifestation display image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-xl md:max-w-2xl lg:max-w-3xl w-full aspect-[3/4] rounded-2xl overflow-hidden border border-gold-30/30 shadow-[0_0_40px_rgba(212,175,55,0.22)] bg-[#050505] mt-6 group select-none"
                  >
                    {/* Glowing golden halo behind the image on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold-dark/20 via-transparent to-transparent opacity-80 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
                    <Image
                      src="https://destromago.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-14-at-20.33.34-768x1024.jpeg"
                      alt="Altar de Operações Reais do Templo Virtus Lux"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Tiny watermark tag */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/85 border border-gold-30/20 py-1.5 px-3.5 rounded-full text-[9px] font-mono uppercase tracking-widest text-gold-light font-bold backdrop-blur-md whitespace-nowrap">
                      Altar Sagrado &bull; Operação Real
                    </div>
                  </motion.div>
                </div>

              </section>

              {/* RITUAL TELEMETRY LOGS COMPONENT */}
              <div className="glass-card p-5 rounded-2xl w-full border-gold-30/20 shadow-lg">
                <div className="flex items-center gap-3.5 mb-3 border-b border-gold-10/15 pb-2.5">
                  <Activity className="w-4 h-4 text-gold animate-pulse" />
                  <span className="text-xs uppercase font-mono tracking-[0.25em] text-gold-light">Canalização Sutil Ativa &bull; Logs do Templo</span>
                  <span className="text-[9px] text-[#888] font-mono ml-auto">Frequência: 528HZ</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px] select-none text-left">
                  {ritualLogs.map((log, index) => (
                    <div key={index} className={index === 0 ? "text-gold-light font-medium" : "text-gray-500"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: O ORÁCULO DE DESTRO MAGO */}
              <section id="oraculo" className="scroll-mt-24 space-y-12 w-full py-16 border-t border-gold-30/15 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-gold/5 via-gold-dark/10 to-gold/5 rounded-full blur-[140px] pointer-events-none" />

                <div className="text-center space-y-3 relative z-10">
                  <span className="text-xs uppercase tracking-[0.4em] text-gold font-mono bg-gold/15 px-3 py-1 rounded-full border border-gold/30">EXPERIÊNCIA ESPIRITUAL</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-normal text-white max-w-3xl mx-auto leading-tight">
                    O Oráculo de <span className="text-gold-light italic font-medium relative inline-block">Destro Mago<span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/40" /></span>
                  </h2>
                  <div className="flex flex-col items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Jogo do Oráculo Completo: R$ 100,00</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
                    Preencha os detalhes abaixo e envie diretamente ao WhatsApp de Destro Mago para agendar sua tiragem completa com Tarô e Baralho Cigano por apenas R$ 100,00.
                  </p>
                </div>

                <div className="glass-card p-6 sm:p-10 rounded-3xl border border-gold-30/20 w-full max-w-3xl mx-auto relative overflow-hidden shadow-[0_0_45px_rgba(212,175,55,0.12)] bg-[#050505]/95 z-10 transition-all duration-500">
                  <form onSubmit={handleConsultOracle} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-gold-light/95 block font-bold">
                          1. Seu Nome / Assinatura Espiritual
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="Como deseja ser chamado pelo Oráculo..."
                            value={oracleName}
                            onChange={(e) => setOracleName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-zinc-950/70 border border-gold-30/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans"
                          />
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-30/60" />
                        </div>
                      </div>

                      {/* Area selector */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-gold-light/95 block font-bold">
                          2. Área de Alinhamento e Força
                        </label>
                        <select 
                          required
                          value={oracleArea}
                          onChange={(e) => setOracleArea(e.target.value)}
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-gold-30/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans cursor-pointer h-[46px]"
                        >
                          <option value="Financeiro">Financeiro, Negócios & Abundância</option>
                          <option value="Amoroso/Relacional">Relacionamento, Atração & União</option>
                          <option value="Proteção Espiritual">Proteção, Quebra de Inveja & Escudo</option>
                          <option value="Caminhos">Abertura de Caminhos & Direção</option>
                          <option value="Saúde/Harmonia">Saúde Vital, Harmonia & Limpeza Sutil</option>
                        </select>
                      </div>

                    </div>

                    {/* Detail section */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-gold-light/95 block font-bold">
                        3. Descreva com sinceridade o que está travando a sua realidade
                      </label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Ex: Sinto que meus negócios começam bem mas travam na hora de fechar, ou sinto uma energia pesada bloqueando minha entrada de dinheiro..."
                        value={oracleDetail}
                        onChange={(e) => setOracleDetail(e.target.value)}
                        className="w-full px-4 py-3.5 bg-zinc-950/70 border border-gold-30/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans resize-none placeholder-zinc-650"
                      />
                    </div>

                    {/* CTA Consult button */}
                    <div className="flex flex-col items-center gap-4 pt-4 border-t border-gold-10/10">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white font-extrabold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(16,185,129,0.25)] flex items-center justify-center gap-3 border border-emerald-400/30 cursor-pointer group"
                      >
                        <svg className="w-5 h-5 fill-current group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.948h.003c4.368 0 7.927-3.558 7.929-7.926a7.86 7.86 0 0 0-2.326-5.596zm-5.603 12.916a6.57 6.57 0 0 1-3.344-.915l-.24-.143-2.487.652.665-2.427-.156-.25a6.56 6.56 0 0 1-1.007-3.483c.003-3.623 2.951-6.57 6.58-6.57a6.57 6.57 0 0 1 4.65 1.93 6.568 6.568 0 0 1 1.929 4.646c-.002 3.623-2.95 6.57-6.58 6.57zM11.754 9.6c-.203-.102-1.205-.595-1.392-.663-.186-.068-.322-.102-.458.102-.136.205-.526.663-.644.8-.118.136-.237.153-.44.051a5.578 5.578 0 0 1-1.636-1.01 5.86 5.86 0 0 1-1.132-1.41c-.12-.204-.013-.314.089-.415.093-.092.203-.238.305-.357.102-.119.136-.203.204-.34a.35.35 0 0 0-.017-.33c-.05-.102-.458-1.102-.627-1.51-.166-.398-.334-.344-.458-.351l-.39-.008c-.14-.008-.363.042-.553.254-.19.213-.729.714-.729 1.743 0 1.03.746 2.02.849 2.158.102.136 1.467 2.24 3.554 3.14.496.214.883.342 1.185.438.5.158.956.135 1.316.084.4-.057 1.205-.492 1.378-.967.172-.475.172-.882.12-.967-.052-.085-.19-.136-.393-.238z"/>
                        </svg>
                        Enviar Dados & Chamar no WhatsApp (R$100,00)
                      </button>
                      <span className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase select-none flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#10b981]/55" /> Envio sigiloso direto para o WhatsApp do Magista
                      </span>
                    </div>

                  </form>
                </div>
              </section>

              {/* SECTION 4: VOCÊ SE ENCOIXA EM UM DESSES PERFIS? (WHO IS THIS FOR?) */}
              <section className="space-y-12 w-full">
                
                <div className="text-center w-full space-y-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-gold font-mono block">Sintonização Vibracional</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">Você se encaixa em um desses perfis?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Buscador Espiritual */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/15 flex flex-col justify-between items-center text-center hover:border-gold/40 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold-30/20 mx-auto">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-lg font-normal text-white">Buscador Espiritual</h4>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Deseja aprofundar sua conexão com forças superiores e receber orientação constante.
                      </p>
                    </div>
                  </div>

                  {/* Empreendedor ou Profissional Liberal */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/15 flex flex-col justify-between items-center text-center hover:border-gold/40 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold-30/20 mx-auto">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-lg font-normal text-white">Empreendedor ou Profissional</h4>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Precisa de energia alinhada para atrair clientes, fechar negócios e expandir resultados.
                      </p>
                    </div>
                  </div>

                  {/* Pessoa em Busca de Harmonia */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/15 flex flex-col justify-between items-center text-center hover:border-gold/40 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold-30/20 mx-auto">
                        <Users className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-lg font-normal text-white">Pessoa em Busca de Harmonia</h4>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Quer atrair amor, melhorar conexões existentes ou resolver conflitos.
                      </p>
                    </div>
                  </div>

                  {/* Quem Precisa de Proteção Espiritual */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/15 flex flex-col justify-between items-center text-center hover:border-gold/40 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold-30/20 mx-auto">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif text-lg font-normal text-white">Quem Precisa de Proteção</h4>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Sente-se alvo de inveja, energias negativas ou ataques espirituais e deseja proteção contínua.
                      </p>
                    </div>
                  </div>

                </div>

              </section>

              {/* SECTION 5: O QUE ESTÃO FALANDO SOBRE O VIRTUS LUX? (WHATSAPP-STYLE SCREENSHOTS TESTIMONIALS) */}
              <section className="space-y-12 w-full py-4">
                
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-gold font-mono block">Testemunhos Reais</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">O que estão falando sobre o VIRTUS LUX?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
                  {/* Testemonial Screen 1 */}
                  <div className="glass-card p-4 rounded-3xl border border-gold-30/15 overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
                    <div className="relative w-full h-56 sm:h-72 md:h-96">
                      <Image 
                        src="https://destromago.com/wp-content/uploads/2025/08/4-1024x962.jpeg"
                        alt="Depoimento de Alinhamento 1"
                        fill
                        className="object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                        priority
                      />
                    </div>
                  </div>

                  {/* Testemonial Screen 2 */}
                  <div className="glass-card p-4 rounded-3xl border border-gold-30/15 overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
                    <div className="relative w-full h-56 sm:h-72 md:h-96">
                      <Image 
                        src="https://destromago.com/wp-content/uploads/2025/08/6-1024x498.jpeg"
                        alt="Depoimento de Alinhamento 2"
                        fill
                        className="object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Testemonial Screen 3 */}
                  <div className="glass-card p-4 rounded-3xl border border-gold-30/15 overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
                    <div className="relative w-full h-56 sm:h-72 md:h-96">
                      <Image 
                        src="https://destromago.com/wp-content/uploads/2025/08/8-1024x288.jpeg"
                        alt="Depoimento de Alinhamento 3"
                        fill
                        className="object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Testimonial call to action */}
                <div className="pt-2 text-center">
                  <a 
                    href="#assinatura-secao"
                    className="inline-flex py-4.5 px-12 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-amber-500 text-black font-extrabold text-xs uppercase tracking-[0.2em] hover:scale-[1.05] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] border border-gold-light/30 shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    Quero Assinar Agora! ↗
                  </a>
                </div>

              </section>

              {/* SECTION 6: O QUE MAIS VOCÊ PODE GANHAR? (BONUSES FEATURE - HIGHLY PROMINENT UPGRADE) */}
              <section className="space-y-12 w-full py-16 border-t border-gold-30/15 relative">
                
                {/* Immersive gold ambient light pedestal backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-gold/5 via-gold-dark/12 to-gold/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="text-center space-y-3 relative z-10">
                  <span className="text-xs uppercase tracking-[0.4em] text-gold font-mono bg-gold/15 px-3 py-1 rounded-full border border-gold/30">OFERTA DE TEMPO LIMITADO</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-normal text-white max-w-3xl mx-auto leading-tight">
                    O que mais você pode ganhar se <span className="text-gold-light italic font-medium relative inline-block">assinar agora?<span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/40" /></span>
                  </h2>
                  <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-mono">Confira o nosso bônus especial com acesso imediato após confirmação:</p>
                </div>

                <div className="glass-card p-10 md:p-14 rounded-3xl border-2 border-gold/45 w-full relative overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.18)] bg-[#050505]/95">
                  
                  {/* Luxury accent brackets */}
                  <div className="absolute top-4 left-4 text-gold-dark/40 font-serif text-xl select-none">&#9724;</div>
                  <div className="absolute bottom-4 right-4 text-gold-dark/40 font-serif text-xl select-none">&#9724;</div>
                  <div className="absolute top-4 right-4 text-gold-dark/40 font-serif text-xl select-none">&#9724;</div>
                  <div className="absolute bottom-4 left-4 text-gold-dark/40 font-serif text-xl select-none">&#9724;</div>

                  {/* Gorgeous gold diagonal stroke */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold/25 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
                    
                    {/* Ebook 3D Showcase with glowing gold pedestal background */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                      {/* Halo ring light behind cover */}
                      <div className="absolute w-64 h-64 bg-gold/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
                      
                      <div className="relative w-[260px] h-[370px] md:w-[280px] md:h-[400px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,175,55,0.3)] overflow-hidden border-2 border-gold/60 transform transition-transform duration-500 hover:scale-[1.06] hover:border-gold-light z-10">
                        <Image 
                          src="https://destromago.com/wp-content/uploads/2025/08/O-Codigo-da-mente-Prospera-1-741x1024.png"
                          alt="Capa do eBook O Código da Mente Próspera"
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                          priority
                        />
                        {/* Semi-translucent overlay banner positioned elegantly at the bottom center */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-max">
                          <span className="px-3.5 py-1 rounded-full bg-[#050505]/95 border-2 border-gold-light text-gold-light font-extrabold text-[10px] tracking-[0.15em] uppercase block shadow-xl">
                            BÔNUS EXCLUSIVO
                          </span>
                        </div>
                      </div>

                      {/* Pedestal Reflection line */}
                      <div className="w-48 h-2 bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-full mt-6 blur-[1.5px] opacity-85" />
                      <span className="text-[10px] text-gold-dark/80 font-mono tracking-widest mt-1.5 uppercase">Treinamento Privado</span>
                    </div>

                    {/* Ebook Title & Interactive Copy with rich points */}
                    <div className="md:col-span-7 space-y-6 text-left">
                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-gold/10 text-gold-light border border-gold-30/35 text-[10px] uppercase tracking-[0.2em] font-mono inline-block">Bônus Incluso 100% Grátis</span>
                        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                          Livro Digital: <span className="text-gold-light font-medium block">O Código da Mente Próspera</span>
                        </h3>
                      </div>

                      <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                        Não é sorte, é sintonia mental e energética de alta performance. Este material exclusivo revela as chaves secretas para preparar o seu campo magnético pessoal e sua consciência mental para se alinharem diretamente à frequência do sucesso material.
                      </p>

                      {/* Micro learning list */}
                      <div className="space-y-3 pt-2 bg-gradient-to-r from-gold/5 to-transparent p-4 rounded-xl border-l-2 border-gold/40">
                        <h4 className="text-xs uppercase tracking-[0.15em] text-gold font-mono font-bold">O Que Você Irá Desbloquear com o Livro:</h4>
                        <ul className="space-y-2 text-xs text-gray-300">
                          <li className="flex items-center gap-2">
                            <span className="text-gold font-bold">💎</span> Como quebrar miasmas mentais limitantes de escassez familiar.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-gold font-bold">💎</span> Técnicas cabalísticas consagradas para meditação de prosperidade.
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-gold font-bold">💎</span> O ritual diário de 5 minutos do Destro Mago para foco e poder material.
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-gold-10/10">
                        <div className="text-xs text-gray-500 font-mono uppercase">
                          Valor Individual: <span className="line-through">R$ 97,00</span>
                        </div>
                        <div className="hidden sm:block text-gray-700">|</div>
                        <div className="text-sm text-gold-light font-medium font-mono flex items-center gap-1.5 animate-pulse">
                          <span>✓</span> INCLUSO TOTALMENTE GRÁTIS NA SUA ASSINATURA
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </section>

              {/* SECTION 7: O QUE VOCÊ VAI RECEBER (VALUE STACK & ACTIVE OFFERS CARD) - EXTENDED & GIVEN EXTRA PROMINENCE */}
              <section id="assinatura-secao" className="space-y-16 w-full py-20 px-4 md:px-8 rounded-[40px] bg-radial-gradient-candle border border-gold/25 relative overflow-hidden my-16 shadow-[0_0_80px_rgba(212,175,55,0.12)]">
                {/* Background ambient gold flares in corners */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-light/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-gold-dark/5 to-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
                
                <div className="text-center space-y-4 relative z-10 max-w-2xl mx-auto">
                  <span className="text-xs uppercase tracking-[0.45em] text-gold-light font-mono font-bold px-4 py-1.5 rounded-full bg-gold-dark/10 border border-gold/30 inline-block animate-pulse">Consagração e Preço Promocional</span>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    O que você vai receber ao se associar <span className="bg-gradient-to-r from-gold-light via-gold to-amber-500 bg-clip-text text-transparent">hoje</span>
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed max-w-lg mx-auto">
                    Garanta sua vaga permanente na egrégora do magista Destro Mago e comece a magnetizar sua nova realidade financeira imediatamente.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch w-full relative z-10">
                  
                  {/* Left Column: List Stack details and values with increased layout volume */}
                  <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl border border-gold-30/20 bg-black/50 backdrop-blur-xl flex flex-col justify-between">
                    <div className="space-y-6 text-left">
                      <div className="flex items-center justify-between border-b border-gold-30/15 pb-4">
                        <h4 className="font-serif text-2xl font-normal text-white italic">Seus Benefícios Coletivos:</h4>
                        <span className="text-[10px] font-mono tracking-widest text-[#777] uppercase">VIRTUS LUX</span>
                      </div>
                      
                      <div className="space-y-4 font-sans text-xs">
                        {[
                          { text: "2 Rituais Coletivos de Alta Magia por Mês", val: "R$ 180,00", desc: "Consagrações semanais feitas pessoalmente no templo físico." },
                          { text: "Descontos de Membro em Rituais Individuais (Goetia e Angelicais)", val: "R$ 1.200,00", desc: "Acesso reservado ao oráculo e ritos de grande calibre." },
                          { text: "Descontos Exclusivos em Tiragens Complexas de Oráculo", val: "R$ 100,00", desc: "Saber exato o que as frentes espirituais dizem sobre você." },
                          { text: "Participação em Sorteios Mensais (1 Rito de Goetia Individual)", val: "R$ 1.000,00", desc: "Oportunidade única de resolver gargalos complexos diretamente." },
                          { text: "Proteção Energética e Espiritual Permanente", val: "R$ 500,00", desc: "Suas barreiras blindadas por fortes egrégoras enquanto estiver ativo." },
                          { text: "Acesso de Prioridade Máxima no Portal de Lançamento", val: "R$ 49,00", desc: "Novidades, ritos especiais e vagas garantidas antes de todo o mercado." },
                          { text: "BÔNUS - eBook O Código da Mente Próspera (Download Direto)", val: "R$ 97,00", desc: "Apostila com segredos cabalísticos de prosperidade pessoal." }
                        ].map((item, idx) => (
                          <div key={idx} className="group flex flex-col gap-1 py-3 border-b border-white/5 transition-all duration-300 hover:bg-white/2 px-2.5 rounded-xl">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-200 md:text-sm font-semibold flex items-center gap-2">
                                <span className="text-gold">&bull;</span> {item.text}
                              </span>
                              <span className="text-gold-light font-bold font-mono text-right text-xs md:text-sm">{item.val}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-sans pl-3.5 leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-gold-30/15 text-left">
                      <div className="flex justify-between items-center font-serif text-lg text-gray-400">
                        <span>Soma de todos os valores entregues:</span>
                        <span className="line-through font-mono text-gray-500">R$ 3.126,00</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 py-2 px-3 bg-gold-dark/10 border border-gold-30/15 rounded-xl text-[10px] text-gold font-mono uppercase tracking-widest justify-center">
                        <span>Economia Ativa de mais de 99% na assinatura recorrente</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Drawn Prominent Checkout Card with Pulse and Premium Highlight */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-[#0c0c0c] via-[#050505] to-[#010101] border-2 border-gold p-10 rounded-[32px] flex flex-col justify-between items-center text-center shadow-[0_0_60px_rgba(212,175,55,0.35)] relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                    {/* Glowing highlight tag */}
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-gold text-black text-[9px] font-mono tracking-widest uppercase font-extrabold px-6 py-2 rounded-bl-2xl shadow-lg animate-pulse">
                      Oferta Ativa
                    </div>
                    
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-bl from-gold/10 to-transparent pointer-events-none" />
                    
                    <div className="space-y-5 w-full">
                      <GoldTriangleLogo className="w-20 h-20 mx-auto filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-slow-pulse" />
                      
                      <div className="space-y-1">
                        <span className="font-serif text-lg tracking-[0.2em] text-gold-light block font-extrabold">VIRTUS LUX</span>
                        <span className="text-[10px] text-zinc-400 block tracking-wider uppercase font-sans">Acesso completo à egrégora por apenas:</span>
                      </div>

                      {/* Giant Price tag */}
                      <div className="py-2 inline-block relative px-6 bg-gold/5 rounded-2xl border border-gold-30/10">
                        <span className="text-gold-dark text-xl font-serif align-super mr-1">R$</span>
                        <span className="text-gold-light text-6xl md:text-7xl font-serif font-extrabold tracking-tight filter drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]">29,90</span>
                        <span className="text-zinc-400 text-[10px] font-mono block mt-1 tracking-[0.2em] uppercase font-bold">ASSINATURA MENSAL</span>
                      </div>
                    </div>

                    {/* Inline checkout confirmation form with premium fields */}
                    <form onSubmit={handleSubscribe} className="w-full space-y-4 my-8 text-left">
                      <div className="space-y-2">
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-bold block">Seu Nome Inteiro:</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Digite seu nome completo..."
                          value={subscriberName}
                          onChange={(e) => setSubscriberName(e.target.value)}
                          className="w-full bg-zinc-950 border border-gold-30/30 rounded-xl p-3.5 text-xs focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 text-white font-sans placeholder-zinc-600 shadow-inner"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-bold block">Melhor e-mail:</label>
                        <input 
                          type="email" 
                          required
                          placeholder="Digite seu melhor e-mail..."
                          value={subscriberEmail}
                          onChange={(e) => setSubscriberEmail(e.target.value)}
                          className="w-full bg-zinc-950 border border-gold-30/30 rounded-xl p-3.5 text-xs focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 text-white font-sans placeholder-zinc-600 shadow-inner"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isActivating}
                        className="w-full py-4.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-amber-500 text-black font-extrabold text-xs uppercase tracking-[0.25em] transition-all duration-355 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-[1.04] active:scale-95 flex items-center justify-center gap-2 border border-gold-light/50 cursor-pointer disabled:opacity-50 mt-6 shadow-xl"
                      >
                        {isActivating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sintonizando Egrégora...
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 animate-pulse" />
                            Quero Assinar Agora
                          </>
                        )}
                      </button>
                    </form>

                    <a
                      href="https://pay.hotmart.com/S101615269G"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold-light hover:text-gold hover:underline font-mono tracking-wide transition-colors duration-300 pb-3 flex items-center justify-center gap-1.5 font-bold"
                    >
                      Ou prefere ir direto ao checkout Hotmart? Clique aqui ›
                    </a>

                    <div className="text-[9px] text-zinc-500 font-mono flex flex-col items-center gap-2 border-t border-zinc-900 pt-4 w-full justify-center">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#555]" />
                        <span>COMPRA SEGURA &bull; CANCELAMENTO INSTANTÂNEO</span>
                      </div>
                      <a 
                        href="https://wa.me/5534999217444?text=Ol%C3%A1%21%20Gostaria%20de%20suporte%20sobre%20a%20assinatura%20do%20Virtus%20Lux."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-1 text-[10px] font-sans text-[#25d366] hover:text-[#20ba5a] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Dúvidas? Fale Conosco: (34) 99921-7444
                      </a>
                    </div>

                  </div>

                </div>

              </section>

              {/* SECTION 8: QUEM CRIOU O VIRTUS LUX (ABOUT DESTRO MAGO PORTRAIT) */}
              <section className="space-y-12 w-full py-6 border-t border-gold-30/10">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Portrait Box with only the beautiful high-fidelity image */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-gold-30/20 bg-black shadow-lg group">
                      {/* Real Portrait Image of Destro Mago */}
                      <Image 
                        src="https://destromago.com/wp-content/uploads/2025/08/DESTRO-819x1024.png"
                        alt="O Magista Destro Mago"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        priority
                      />
                    </div>
                  </div>

                  {/* Creator Description Box */}
                  <div className="md:col-span-7 space-y-6 text-left">
                    <span className="text-xs uppercase tracking-[0.35em] text-gold font-mono block">O Magista Fundador</span>
                    <h3 className="font-serif text-3xl font-normal text-white">Quem criou o VIRTUS LUX</h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed font-sans">
                      Destro é mago salomônico, guiado pela esfera de Geburah na Cabala, que representa justiça, disciplina e poder de decisão. Seu nome reflete força, clareza moral e o compromisso em ser um canal de justiça divina na Terra.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed font-sans">
                      Mais do que um título, Destro é um propósito: manifestar equilíbrio entre rigor e misericórdia, conduzindo rituais com seriedade, poder e fidelidade à ordem divina.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex gap-2.5 items-center text-xs text-gray-200">
                        <CheckCircle className="w-4.5 h-4.5 text-gold flex-shrink-0" />
                        <span>+200 rituais realizados com resultados comprovados</span>
                      </div>
                      <div className="flex gap-2.5 items-center text-xs text-gray-200">
                        <CheckCircle className="w-4.5 h-4.5 text-gold flex-shrink-0" />
                        <span>+500 participantes impactados pelos ritos coletivos</span>
                      </div>
                      <div className="flex gap-2.5 items-center text-xs text-gray-200">
                        <CheckCircle className="w-4.5 h-4.5 text-gold flex-shrink-0" />
                        <span>Reconhecimento crescente no meio esotérico pela seriedade e compromisso</span>
                      </div>
                    </div>

                  </div>

                </div>

              </section>

              {/* SECTION 9: PERGUNTAS FREQUENTES (FAQ ACCORDION) */}
              <section className="space-y-12 w-full py-6 border-t border-gold-30/10">
                
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-gold font-mono block">Esclarecimentos</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">Perguntas Frequentes</h2>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      q: "Como terei acesso aos ritos?",
                      a: "Após confirmar sua assinatura, você receberá todas as instruções no WhatsApp e e-mail. Antes de cada rito, enviamos a preparação necessária."
                    },
                    {
                      q: "O acesso é vitalício?",
                      a: "Enquanto sua assinatura estiver ativa, você terá acesso a todos os ritos coletivos do mês, além dos bônus e vantagens exclusivas."
                    },
                    {
                      q: "Posso cancelar quando quiser?",
                      a: "Sim. A assinatura do Virtus Lux não possui fidelidade de longo prazo. Você pode realizar o cancelamento simples no momento que desejar diretamente no painel ou via suporte."
                    },
                    {
                      q: "E se eu não entender nada de magia?",
                      a: "Não tem problema. O Virtus Lux foi criado para pessoas que querem resultados espirituais sem precisar executar rituais por conta própria. Toda a operação é feita por nós."
                    },
                    {
                      q: "Preciso estar online no dia do rito?",
                      a: "Não é obrigatório, mas participar no horário fortalece sua conexão. De qualquer forma, sua intenção é inserida e você recebe os efeitos do trabalho."
                    },
                    {
                      q: "Quais áreas da vida posso trabalhar com o Virtus Lux?",
                      a: "Prosperidade, abertura de caminhos, proteção, amor, equilíbrio emocional, limpeza espiritual e muito mais."
                    }
                  ].map((faq, idx) => {
                    const isOpen = openedFaq === idx;
                    return (
                      <div 
                        key={idx} 
                        className="glass-card rounded-xl overflow-hidden border border-gold-30/10 transition-all duration-300 text-left"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full py-4.5 px-6 flex items-center justify-between text-left font-serif text-base text-white hover:text-gold-light transition-all duration-300"
                        >
                          <span className="font-medium pr-4">{faq.q}</span>
                          <span className="text-gold text-lg font-mono font-bold">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gold-10/5 bg-black/40 px-6 py-4.5 text-xs text-gray-400 font-sans leading-relaxed"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </section>

              {/* SECTION 10: AINDA TEM ALGUMA DÚVIDA? WHATSAPP BUTTON */}
              <section className="glass-card p-8 rounded-3xl border border-gold-30/20 w-full text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-white">Ainda tem alguma dúvida?</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                    Se você tem alguma dúvida, qualquer que seja, pode falar direto comigo no meu WhatsApp. É só me chamar, sou eu mesmo que vou te responder.
                  </p>
                </div>

                <a
                  href="https://wa.me/5534999217444?text=Ol%C3%A1%20Destro%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20assinatura%20do%20Virtus%20Lux..."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex py-3 px-8 rounded-full bg-[#25d366] text-black font-extrabold text-xs uppercase tracking-widest gap-2 items-center hover:scale-[1.03] transition-transform duration-300"
                >
                  <MessageSquare className="w-4 h-4 text-black fill-current" />
                  Falar no WhatsApp: (34) 99921-7444
                </a>
              </section>

            </motion.div>
          )}

          {/* TAB 2: PORTAL DE ASSINANTE (CRM DA LUX) */}
          {activeTab === 'crm' && (
            <motion.div
              key="crm-tabs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-left"
            >
              
              {/* CRM Dashboard Premium Header */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border-gold-30/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Background decorative styling */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gold-dark/10 border border-gold/40 flex items-center justify-center text-gold">
                    <GoldTriangleLogo className="w-12 h-12" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase block">Membro Consagrado</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-none">
                      {subscriberName || "Iniciado Virtus Lux"}
                    </h2>
                    <p className="text-gold-light text-xs font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      Assinatura Ativa &bull; Frequência Alinhada com Destro Mago
                    </p>
                  </div>
                </div>

                {/* Profile attributes indicators */}
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <div className="bg-black/50 border border-gold-30/20 px-4 py-2 rounded-lg">
                    <span className="text-gray-500 block text-[9px] uppercase">Código de Egrégora</span>
                    <span className="text-gold-light font-bold">VLX-{(subscriberEmail ? subscriberEmail.length * 42 : 1608)}</span>
                  </div>
                  <div className="bg-black/50 border border-gold-30/20 px-4 py-2 rounded-lg">
                    <span className="text-gray-500 block text-[9px] uppercase">Próximo Ritual Coletivo</span>
                    <span className="text-gold-light font-bold font-sans">Terça-Feira, 20h00</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsSubscribed(false);
                      setActiveTab('landing');
                    }}
                    className="p-3.5 rounded-lg border border-red-950 bg-red-950/10 text-red-400 hover:bg-red-950/35 transition-all duration-300 flex items-center gap-2"
                    title="Encerrar Conexão"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Grid content blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Portal Column Left: Manifest targets scheduler */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Intention transmitter */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/20 space-y-4">
                    <div className="flex items-center gap-2 border-b border-gold-10/10 pb-2">
                      <Zap className="w-4 h-4 text-gold" />
                      <h3 className="font-serif text-xl font-bold text-white">Adicionar Intenção de Manifestação</h3>
                    </div>
                    
                    <p className="text-gray-400 text-xs leading-relaxed font-sans">
                      Escreva seus alvos ou problemas pessoais específicos. O magista Destro Mago os colocará sob o altar e os sintonizará nas próximas meditações coletivas da egrégora.
                    </p>

                    <form onSubmit={handleAddManifest} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-mono block">Descrição do Objetivo / Alvo:</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Prosperidade na venda do imóvel em SP..."
                            value={newManifestTarget}
                            onChange={(e) => setNewManifestTarget(e.target.value)}
                            className="w-full bg-black border border-gold-30/20 rounded-lg p-2.5 text-sm focus:border-gold focus:outline-none text-white placeholder:text-gray-705 font-sans"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-mono block">Área de Canalização:</label>
                          <select 
                            value={newManifestArea}
                            onChange={(e) => setNewManifestArea(e.target.value)}
                            className="w-full bg-black border border-gold-30/20 rounded-lg p-2.5 text-sm focus:border-gold focus:outline-none text-white font-sans"
                          >
                            <option value="Abertura de Caminhos">Abertura de Caminhos</option>
                            <option value="Proteção Contínua">Proteção Contínua</option>
                            <option value="Quebra de Bloqueios">Quebra de Bloqueios</option>
                          </select>
                        </div>

                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-gold text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-gold-heavy/20 hover:scale-[1.01] border border-gold-light"
                      >
                        Transmitir Intenção para o Altar de Destro Mago
                      </button>
                    </form>

                  </div>

                  {/* Active target tracking panel */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-gold-10/10 pb-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-gold" />
                        <h3 className="font-serif text-xl font-bold text-white">Alinhamentos Ativos</h3>
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-gold-dark font-mono uppercase">Telemática de Geburah</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-sans text-left">
                        <thead>
                          <tr className="border-b border-gold-10/10 text-gold-dark text-[10px] uppercase tracking-wider font-mono">
                            <th className="pb-3 text-left">Alvo Transmitido</th>
                            <th className="pb-3 text-left">Canal Divino</th>
                            <th className="pb-3 text-left">Frequência</th>
                            <th className="pb-3 text-right">Data de Envio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customManifests.map((item) => (
                            <tr key={item.id} className="border-b border-gold-10/5 group hover:bg-gold-dark/5 transition-all duration-150">
                              <td className="py-4 text-white font-medium text-left">{item.target}</td>
                              <td className="py-4 text-left">
                                <span className="bg-gold/10 border border-gold-30/20 px-2.5 py-1 rounded-full text-[10px] text-gold-light uppercase tracking-wide">
                                  {item.area}
                                </span>
                              </td>
                              <td className="py-4 text-left">
                                <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase ${
                                  item.status === 'Conectado' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    item.status === 'Conectado' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                                  }`} />
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-4 text-right font-mono text-gray-500">{item.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>

                {/* Portal Column Right: Wisdom center & live updates */}
                <div className="space-y-6">
                  
                  {/* Weekly wisdom message box (simulating CRM info) */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/20 space-y-4 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center gap-2 text-gold">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-serif tracking-wider font-bold text-sm">Oráculo Semanal de Destro Mago</span>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed font-sans">
                      &ldquo;Filhos da Lux, os alinhamentos planetários desta semana fortalecem a purificação do plexo solar. Removam quaisquer acordos com a autossabotagem e permitam que a energia do Sol quebre contratos antigos de insolvência. Às terças de noite estarei enviando a queima sacrificial.&rdquo;
                    </p>

                    <div className="pt-2 border-t border-gold-10/10 flex items-center justify-between text-[10px] text-gold-dark font-mono">
                      <span>Atualizado há 3 horas</span>
                      <span>Destro Mago Supremo</span>
                    </div>
                  </div>

                  {/* Operational parameters simulator (visual value adjustment) */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/20 space-y-4 text-left">
                    <div className="flex items-center gap-2 border-b border-gold-10/10 pb-2">
                      <Sliders className="w-4 h-4 text-gold" />
                      <h3 className="font-serif text-sm font-bold text-white">Parâmetros Sintonizados</h3>
                    </div>

                    <p className="text-gray-500 text-[10px] leading-relaxed font-sans">
                      Seu portal monitora sua sintonia vibracional recomendada. Ajuste as frequências que deseja priorizar na egrégora:
                    </p>

                    <div className="space-y-3.5 pt-2 font-mono">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-400">Atração Financeira</span>
                          <span className="text-gold">85% / Alta</span>
                        </div>
                        <div className="h-1 bg-gray-900 rounded-full overflow-hidden border border-gold-10/20">
                          <div className="h-full bg-gold rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-400">Escudo Protetor Individual</span>
                          <span className="text-gold">95% / Máximo</span>
                        </div>
                        <div className="h-1 bg-gray-900 rounded-full overflow-hidden border border-gold-10/20">
                          <div className="h-full bg-gold rounded-full" style={{ width: '95%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-400">Transmutações Cármicas</span>
                          <span className="text-gold">60% / Moderada</span>
                        </div>
                        <div className="h-1 bg-gray-900 rounded-full overflow-hidden border border-gold-10/20">
                          <div className="h-full bg-gold rounded-full" style={{ width: '60%' }} />
                        </div>
                      </div>
                    </div>

                    <p className="text-[9px] text-gold-dark/80 text-center font-mono uppercase tracking-widest pt-2">
                      ▲ Sincronização constante ativa ▲
                    </p>
                  </div>

                  {/* Quick Oracle interaction inside CRM */}
                  <div className="glass-card p-6 rounded-2xl border-gold-30/20 space-y-4 text-left">
                    <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-gold" />
                      Consulta Direta de Altar
                    </h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed font-sans">
                      Precisa de resposta mística para uma dúvida imediata do seu negócio ou vida pessoal? Acesse nosso prompt direto.
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('landing');
                        setTimeout(() => {
                          const section = document.getElementById('oraculo');
                          if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }}
                      className="w-full py-2 bg-gold-dark/20 text-gold-light border border-gold-30/30 rounded-lg text-xs font-semibold hover:bg-gold-dark/40 transition-all duration-300 font-mono"
                    >
                      Entrar no Oráculo Principal
                    </button>
                  </div>

                </div>

              </div>
              
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER (Elegante, minimalista em grafite/preto) */}
      <footer className="border-t border-gold-10/10 bg-[#020202] py-16 relative z-10 font-sans text-xs">
        <div className="w-full px-6 md:px-12 lg:px-20 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <GoldTriangleLogo className="w-8 h-8 opacity-60" />
              <div className="text-left">
                <span className="font-serif text-sm tracking-widest text-gold-light font-bold block">VIRTUS LUX</span>
                <span className="text-[10px] text-gray-500 block">&copy; 2026 Templo Virtus Lux. Todos os direitos reservados.</span>
                <a 
                  href="https://wa.me/5534999217444?text=Ol%C3%A1%21%20Gostaria%20de%20suporte%20sobre%20a%20assinatura%20do%20Virtus%20Lux."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-zinc-400 hover:text-[#25d366] transition-colors duration-300 mt-1.5 flex items-center gap-1 font-mono tracking-wider cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3 text-[#25d366]" />
                  Suporte WhatsApp: (34) 99921-7444
                </a>
              </div>
            </div>

            {/* Quick links & Legal Links Revised */}
            <div className="flex flex-col items-center gap-4 sm:items-end">
              <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-gray-400 uppercase tracking-widest text-[9px] font-bold">
                <a href="#hero" onClick={() => setActiveTab('landing')} className="hover:text-gold transition-colors duration-300">Dobra Inicial</a>
                <a href="#beneficios" onClick={() => setActiveTab('landing')} className="hover:text-gold transition-colors duration-300 font-sans">Os Três Pilares</a>
                <a href="#oraculo" onClick={() => setActiveTab('landing')} className="hover:text-gold transition-colors duration-300">O Oráculo</a>
                <a href="#assinatura-secao" onClick={() => setActiveTab('landing')} className="hover:text-gold transition-colors duration-300">Consagração</a>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 text-[10px] text-gold-dark/90 tracking-wider font-mono">
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="hover:text-gold-light transition-colors duration-300 cursor-pointer underline decoration-gold-30/30 underline-offset-4 hover:decoration-gold/50"
                >
                  Política de Privacidade
                </button>
                <span className="text-zinc-800 hidden sm:inline">&bull;</span>
                <button 
                  onClick={() => setActiveModal('terms')} 
                  className="hover:text-gold-light transition-colors duration-300 cursor-pointer underline decoration-gold-30/30 underline-offset-4 hover:decoration-gold/50"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>



        </div>
      </footer>

      {/* LEGAL MODALS (Política de Privacidade & Termos de Uso) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal window content container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-zinc-950 to-[#050505] border border-gold/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(212,175,55,0.25)] flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Close button top right */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-zinc-900 border border-white/5 hover:border-gold-30/55 hover:bg-zinc-800 text-gray-400 hover:text-gold transition-all duration-300 cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-4 border-b border-gold-30/15 pb-5 text-left select-none">
                <div className="w-12 h-12 rounded-xl bg-gold-dark/15 border border-gold/40 flex items-center justify-center text-gold-light">
                  <GoldTriangleLogo className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-mono block">Documento Oficial</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeModal === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso & Condições'}
                  </h3>
                </div>
              </div>

              {/* Scrolling Text Content */}
              <div className="flex-1 overflow-y-auto py-6 pr-2 text-left text-xs text-gray-300 leading-relaxed font-sans space-y-6 custom-scrollbar">
                
                {activeModal === 'privacy' ? (
                  <>
                    <p className="font-semibold text-gray-200">
                      Bem-vindo à Declaração de Privacidade da Egrégora Virtus Lux. Nós valorizamos e protegemos a integridade absoluta dos seus dados pessoais e rituais com o mais estrito padrão místico e digital.
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">1. Sigilo e Confidencialidade</h4>
                      <p>Todos os dados fornecidos por meio do Portal do Iniciado, como o nome completo, o e-mail cadastrado e, primordialmente, as suas <strong>Intenções de Manifestação</strong>, são tratados sob sigilo perpétuo. Suas preces e desejos são canalizados de maneira estritamente individual por Destro Mago e não são revelados a terceiros sob nenhuma circunstância.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">2. Transmutação de Dados no Altar</h4>
                      <p>Conforme os princípios da nossa egrégora, as intenções enviadas no painel digital são materializadas temporariamente pelo magista e finalmente queimadas em sacrifício de mirra e breu branco nos Rituais Coletivos. Esse ato de fogo transmutador atua como uma exclusão física e metafísica definitiva de quaisquer registros íntimos.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">3. Tratamento Digital de Informações (LGPD)</h4>
                      <p>Coletamos unicamente os dados necessários para controlar o status de sua ativação mística e fornecer acesso seguro ao painel digital. Respeitamos integralmente a Lei Geral de Proteção de Dados (LGPD). Você possui direito irrestrito de solicitar a exclusão total de seus dados ou revogação de seu cadastro a qualquer momento, o que cessará imediatamente sua conexão.</p>
                    </div>

                    <div className="space-y-2">
                       <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">4. Cookies e Segurança de Transações</h4>
                       <p>Utilizamos cookies apenas para manter a segurança de sua sessão autenticada. Todo o fluxo de pagamentos é gerenciado em ambiente auditado e certificado com tráfego TLS 1.3 pela plataforma líder nacional Hotmart, garantindo transações totalmente blindadas.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-200 font-sans">
                      Estes Termos e Diretrizes regem o seu ingresso ativo, conduta e direitos de acesso como membro associado à egrégora mística dirigida pelo magista Destro Mago.
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">1. Natureza da Associação e Resultados</h4>
                      <p>O Virtus Lux é uma egrégora mística de rituais coletivos e aconselhamento através do Oráculo. Pela própria natureza metafísica da Alta Magia, os resultados práticos, embora vastamente comprovados por testemunhos, operam em conformidade mútua com o alinhamento de frequência e recetividade do próprio iniciado, não constituindo promessa rígida de facilitação garantida.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">2. Regime de Contribuição Recorrente</h4>
                      <p>A taxa associativa de R$ 29,90 mensais garante a manutenção periódica do Iniciado no círculo de proteção contínua e sua inclusão nominal nos 2 ritos coletivos mensais. Trata-se de uma assinatura mensal sem contrato de permanência fixa. Seus bônus, eBooks adicionais e recursos de Portal são vinculados à vigência dessa contribuição.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">3. Cancelamento Autônomo</h4>
                      <p>O cancelamento da contribuição pode ser efetuado livremente a qualquer momento através do e-mail oficial, no Portal do Iniciado, ou diretamente pela interface do titular na Hotmart. Ao solicitar o cancelamento, seu nome e intenções são retirados fisicamente do Altar de Geburah no ciclo seguinte.</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">4. Alinhamento Ético e Respeito à Egrégora</h4>
                      <p>A egrégora prega a mútua prosperidade e o respeito sagrado. Nós nos reservamos o direito de banir permanentemente qualquer participante que propague discursos ofensivos ao magista, desrespeito à crença ou tentativa de vazamento e cópia do conhecimento e rituais compartilhados.</p>
                    </div>
                  </>
                )}

              </div>

              {/* Footer Closer */}
              <div className="border-t border-gold-30/15 pt-5 flex items-center justify-between">
                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  TEMPLO VIRTUS LUX &bull; 2026
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-dark to-gold text-black font-extrabold text-[10px] uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Li e Concordo
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BALLOON - Faithful official branding with custom premium glow */}
      <div className="fixed bottom-6 right-6 z-[80] group flex items-center gap-3">
        {/* Soft elegant pop-up message tag */}
        <div className="bg-[#050505] border border-gold/30 hover:border-gold/50 text-white text-[11px] font-sans font-bold px-4 py-2.5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 pointer-events-none translate-x-4 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-xl whitespace-nowrap flex items-center gap-1.5 text-left border-l-4 border-l-[#25D366]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          Dúvidas? Fale Conosco
        </div>

        {/* Floating Button element */}
        <a
          href="https://wa.me/5534999217444?text=Ol%C3%A1%20Destro%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20assinatura%20do%20Virtus%20Lux..."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center group"
          title="Fale Conosco no WhatsApp"
        >
          {/* Breathing ripple rings behind the button */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none" />
          
          {/* Faithful official WhatsApp icon geometry */}
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white relative z-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.012 2C6.485 2 2 6.482 2 12.008c0 1.73.443 3.414 1.288 4.909L2 22l5.244-1.372c1.448.789 3.072 1.206 4.76 1.206 5.527 0 10.012-4.482 10.012-10.008c0-2.67-1.036-5.18-2.92-7.065C17.21 3.036 14.7 2 12.012 2zm5.727 13.918c-.244.686-1.218 1.264-1.68 1.32-.462.056-.93.08-2.98-.775-2.625-1.095-4.32-3.76-4.453-3.937-.13-.176-1.072-1.425-1.072-2.72 0-1.293.665-1.928.9-2.196.236-.268.513-.335.684-.335.172 0 .343.003.493.01.157.007.367-.06.574.444.21.517.72 1.76.783 1.89.063.13.104.28.017.447-.087.168-.13.272-.257.422-.128.15-.268.337-.384.453-.127.127-.26.265-.113.517.147.253.654 1.078 1.403 1.745.966.862 1.776 1.13 2.027 1.258.25.127.397.108.546-.062.15-.17.63-.734.8-.985.168-.25.337-.21.567-.126.23.084 1.458.687 1.708.813.25.126.417.19.477.293.06.104.06.602-.184 1.288z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}
