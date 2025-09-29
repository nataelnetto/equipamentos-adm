import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { CheckCircle, Monitor, Headphones, Keyboard, Mouse, Armchair, FootprintsIcon, Laptop, Sparkles, Clock, Calendar, Zap, Shield, Cpu, Wifi, Lock, Eye, EyeOff } from 'lucide-react';
import './App.css';

function App() {
  // Estados principais
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Estados de login
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    codigoColaborador: '',
    notebook: '',
    notebookOutro: '',
    monitor: '',
    monitorOutro: '',
    headphone: '',
    headphoneOutro: '',
    teclado: '',
    tecladoOutro: '',
    mouse: '',
    mouseOutro: '',
    cadeira: '',
    cadeiraOutro: '',
    apoioPe: '',
    apoioPeOutro: '',
    sugestoes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Configuração dos equipamentos
  const equipamentos = [
    { 
      key: 'notebook', 
      label: 'Notebook', 
      icon: Laptop, 
      options: ['Bom estado', 'Outro'],
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      glowColor: 'shadow-cyan-500/50'
    },
    { 
      key: 'monitor', 
      label: 'Tela (Monitor)', 
      icon: Monitor, 
      options: ['Bom estado', 'Outro'],
      gradient: 'from-pink-400 via-red-500 to-orange-600',
      glowColor: 'shadow-pink-500/50'
    },
    { 
      key: 'headphone', 
      label: 'Headphone', 
      icon: Headphones, 
      options: ['Bom estado', 'Outro'],
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      glowColor: 'shadow-green-500/50'
    },
    { 
      key: 'teclado', 
      label: 'Teclado', 
      icon: Keyboard, 
      options: ['Bom estado', 'Uso particular', 'Outro'],
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      glowColor: 'shadow-orange-500/50'
    },
    { 
      key: 'mouse', 
      label: 'Mouse', 
      icon: Mouse, 
      options: ['Bom estado', 'Uso particular', 'Outro'],
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      glowColor: 'shadow-amber-500/50'
    },
    { 
      key: 'cadeira', 
      label: 'Cadeira', 
      icon: Armchair, 
      options: ['Bom estado', 'Outro'],
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      glowColor: 'shadow-blue-500/50'
    },
    { 
      key: 'apoioPe', 
      label: 'Apoio de pé', 
      icon: FootprintsIcon, 
      options: ['Bom estado', 'Não tenho', 'Outro'],
      gradient: 'from-purple-400 via-pink-500 to-rose-600',
      glowColor: 'shadow-purple-500/50'
    }
  ];

  // Funções de autenticação
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (loginPassword === '20Acesse20#') {
      setIsLoggedIn(true);
      setCurrentView('form');
      setLoginPassword('');
    } else {
      setLoginError('Senha incorreta. Tente novamente.');
    }
    setIsLoggingIn(false);
  };

  // Funções do formulário
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEquipmentChange = (equipmentKey, value) => {
    setFormData(prev => ({
      ...prev,
      [equipmentKey]: value,
      [`${equipmentKey}Outro`]: value === 'Outro' ? prev[`${equipmentKey}Outro`] : ''
    }));
  };

  const formatWhatsAppMessage = () => {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');

    let message = `🔧 *VERIFICAÇÃO DE EQUIPAMENTOS - CSCX*\n\n`;
    message += `👤 *Nome:* ${formData.nome}\n`;
    message += `🔑 *Código Colaborador:* ${formData.codigoColaborador}\n\n`;
    message += `🖥️ *EQUIPAMENTOS:*\n`;

    equipamentos.forEach(eq => {
      const status = formData[eq.key];
      const outro = formData[`${eq.key}Outro`];
      if (status) {
        message += `• ${eq.label}: ${status}`;
        if (status === 'Outro' && outro) {
          message += `: ${outro}`;
        }
        message += `\n`;
      } else {
        message += `• ${eq.label}: \n`;
      }
    });

    message += `\n💬 *Sugestões/Comentários:* ${formData.sugestoes || 'Nenhuma'}\n\n`;
    message += `📅 Data: ${data}\n`;
    message += `⏰ Hora: ${hora}\n\n`;

    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.codigoColaborador) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar dados para o backend
      const response = await fetch('https://mzhyi8c1zd3x.manus.space/api/verificacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Enviar via WhatsApp
        const whatsappMessage = formatWhatsAppMessage() + `🆔 *Registro ID:* ${result.id}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=5532984218936&text=${encodedMessage}&type=phone_number&app_absent=0`;
        
        window.open(whatsappUrl, '_blank');
        
        setSubmitted(true);
        
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            nome: '',
            codigoColaborador: '',
            notebook: '',
            notebookOutro: '',
            monitor: '',
            monitorOutro: '',
            headphone: '',
            headphoneOutro: '',
            teclado: '',
            tecladoOutro: '',
            mouse: '',
            mouseOutro: '',
            cadeira: '',
            cadeiraOutro: '',
            apoioPe: '',
            apoioPeOutro: '',
            sugestoes: ''
          });
        }, 3000);
      } else {
        throw new Error('Erro ao enviar dados');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente da tela de login
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              ACESSO RESTRITO
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              CSCX - Verificação de Equipamentos
            </CardDescription>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1"></div>
            <Lock className="w-4 h-4 text-blue-400" />
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1"></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-400 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4" />
                SENHA DE ACESSO
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Digite a senha de acesso"
                  className="bg-white/10 border-white/30 text-white placeholder-gray-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {loginError && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
                {loginError}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AUTENTICANDO...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  ACESSAR SISTEMA
                </div>
              )}
            </Button>
          </form>
          
          <div className="text-center text-xs text-gray-400 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              SISTEMA SEGURO
              <Wifi className="w-3 h-3" />
              CRIPTOGRAFADO
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Componente da tela do formulário
  const FormScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="text-center mb-8 pt-8">
          <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                VERIFICAÇÃO
              </h1>
              <div className="p-3 bg-white/20 rounded-full">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              EQUIPAMENTOS
            </h2>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">SEXTA-FEIRA</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Wifi className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">SISTEMA ATIVO</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              SISTEMA DE MONITORAMENTO
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 text-lg leading-relaxed">
              Sistema inteligente de verificação de equipamentos para garantir máxima performance operacional.
              Monitoramento em tempo real para continuidade dos serviços CSCX.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                IDENTIFICAÇÃO DO OPERADOR
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-green-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  NOME DO OPERADOR *
                </Label>
                <Input
                  id="nome"
                  key="nome-input"
                  value={formData.nome || ''}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo" className="text-orange-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  CÓDIGO DE ACESSO
                </Label>
                <Input
                  id="codigo"
                  key="codigo-input"
                  value={formData.codigoColaborador || ''}
                  onChange={(e) => handleInputChange('codigoColaborador', e.target.value)}
                  placeholder="Digite seu código"
                  className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                DIAGNÓSTICO DE HARDWARE
              </CardTitle>
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full">
                <Cpu className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipamentos.map((equipamento) => (
                <Card key={equipamento.key} className={`bg-gradient-to-br ${equipamento.gradient} p-1 shadow-xl ${equipamento.glowColor} hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-lg p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <equipamento.icon className="w-8 h-8 text-white" />
                      <h3 className="text-xl font-bold text-white">{equipamento.label}</h3>
                    </div>
                    
                    <RadioGroup
                      value={formData[equipamento.key]}
                      onValueChange={(value) => handleEquipmentChange(equipamento.key, value)}
                      className="space-y-3"
                    >
                      {equipamento.options.map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`${equipamento.key}-${option}`} className="border-white/50 text-white" />
                          <Label 
                            htmlFor={`${equipamento.key}-${option}`} 
                            className={`text-lg font-semibold cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                              formData[equipamento.key] === option 
                                ? option === 'Bom estado' 
                                  ? 'bg-green-500/30 text-green-200 border border-green-400' 
                                  : option === 'Outro'
                                  ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400'
                                  : option === 'Uso particular'
                                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400'
                                  : 'bg-gray-500/30 text-gray-200 border border-gray-400'
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {formData[equipamento.key] === 'Outro' && (
                      <div className="mt-4 space-y-2 animate-fadeIn">
                        <Label className="text-yellow-400 font-semibold flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          DESCRIÇÃO DO PROBLEMA
                        </Label>
                        <div className="relative">
                          <Input
                            key={`${equipamento.key}-outro-input`}
                            value={formData[`${equipamento.key}Outro`] || ''}
                            onChange={(e) => handleInputChange(`${equipamento.key}Outro`, e.target.value)}
                            placeholder="Descreva o problema detectado..."
                            className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-400/50 text-white placeholder-gray-300 pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-orange-400">🔍</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                RELATÓRIO ADICIONAL
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="sugestoes" className="text-green-400 font-semibold">
                Observações, sugestões ou comentários adicionais
              </Label>
              <Textarea
                id="sugestoes"
                key="sugestoes-textarea"
                value={formData.sugestoes || ''}
                onChange={(e) => handleInputChange('sugestoes', e.target.value)}
                placeholder="Descreva observações, sugestões ou comentários adicionais..."
                className="bg-white/10 border-white/30 text-white placeholder-gray-400 min-h-[100px] text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-8">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.nome || !formData.codigoColaborador}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-12 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                PROCESSANDO...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                CONFIRMAR
                <Sparkles className="w-6 h-6" />
              </div>
            )}
          </Button>
        </div>

        {submitted && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
              <CardContent className="p-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  VERIFICAÇÃO ENVIADA!
                </h3>
                <p className="text-gray-300 mb-6">
                  Sua verificação foi enviada com sucesso via WhatsApp.
                </p>
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold">PROCESSAMENTO CONCLUÍDO</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  // Renderização principal
  return (
    <div className="App">
      {currentView === 'login' ? <LoginScreen /> : <FormScreen />}
    </div>
  );
}

export default App;
