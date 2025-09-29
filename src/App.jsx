import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { CheckCircle, Monitor, Headphones, Keyboard, Mouse, Armchair, FootprintsIcon, Laptop, Sparkles, Clock, Calendar, Zap, Shield, Cpu, Wifi, Lock, Eye, EyeOff } from 'lucide-react'
import acesseLogo from './assets/acesse-logo.png'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

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
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      gradient: 'from-purple-400 via-pink-500 to-red-500',
      glowColor: 'shadow-purple-500/50'
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
      gradient: 'from-red-400 via-rose-500 to-pink-600',
      glowColor: 'shadow-red-500/50'
    },
    { 
      key: 'mouse', 
      label: 'Mouse', 
      icon: Mouse, 
      options: ['Bom estado', 'Uso particular', 'Outro'],
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      glowColor: 'shadow-yellow-500/50'
    },
    { 
      key: 'cadeira', 
      label: 'Cadeira', 
      icon: Armchair, 
      options: ['Bom estado', 'Outro'],
      gradient: 'from-indigo-400 via-blue-500 to-cyan-600',
      glowColor: 'shadow-indigo-500/50'
    },
    { 
      key: 'apoioPe', 
      label: 'Apoio de pé', 
      icon: FootprintsIcon, 
      options: ['Bom estado', 'Não tenho', 'Outro'],
      gradient: 'from-pink-400 via-purple-500 to-indigo-600',
      glowColor: 'shadow-pink-500/50'
    }
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')

    // Simular delay de autenticação
    setTimeout(() => {
      if (loginPassword === '20Acesse20#') {
        setIsLoggedIn(true)
        setLoginError('')
      } else {
        setLoginError('Senha incorreta. Tente novamente.')
      }
      setIsLoggingIn(false)
    }, 1500)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getFieldValue = (equipamento) => {
    const value = formData[equipamento.key]
    if (value === 'Outro') {
      const outroValue = formData[`${equipamento.key}Outro`]
      return outroValue ? `Outro: ${outroValue}` : 'Outro'
    }
    return value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Preparar mensagem para WhatsApp
    const message = `🔍 *VERIFICAÇÃO DE EQUIPAMENTOS - CSCX*

👤 *Nome:* ${formData.nome}
🆔 *Código Colaborador:* ${formData.codigoColaborador}

📋 *EQUIPAMENTOS:*
💻 Notebook: ${getFieldValue(equipamentos[0])}
🖥️ Monitor: ${getFieldValue(equipamentos[1])}
🎧 Headphone: ${getFieldValue(equipamentos[2])}
⌨️ Teclado: ${getFieldValue(equipamentos[3])}
🖱️ Mouse: ${getFieldValue(equipamentos[4])}
🪑 Cadeira: ${getFieldValue(equipamentos[5])}
🦶 Apoio de pé: ${getFieldValue(equipamentos[6])}

💬 *Sugestões/Comentários:* ${formData.sugestoes || 'Nenhuma'}

📅 Data: ${new Date().toLocaleDateString('pt-BR')}
⏰ Hora: ${new Date().toLocaleTimeString('pt-BR')}`

    // Enviar para WhatsApp
    const whatsappNumber = '5532984218936'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    // Simular delay de envio
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  // Tela de Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              ACESSO RESTRITO
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              CSCX - Verificação de Equipamentos
            </CardDescription>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              <Lock className="h-5 w-5 text-cyan-400" />
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-cyan-300 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Senha de Acesso
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur-sm h-14 text-lg rounded-xl pr-12"
                    placeholder="Digite a senha de acesso"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-red-400 text-sm flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                    <Zap className="h-4 w-4" />
                    {loginError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoggingIn || !loginPassword}
                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 text-white py-4 text-lg font-bold disabled:opacity-50 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 disabled:hover:scale-100 rounded-xl border-0"
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    AUTENTICANDO...
                  </>
                ) : (
                  <>
                    <Shield className="h-6 w-6 mr-3" />
                    ACESSAR SISTEMA
                    <Zap className="h-6 w-6 ml-3" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4" />
                  <span>SISTEMA SEGURO</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4" />
                  <span>CRIPTOGRAFADO</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <Card className="w-full max-w-md text-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <CheckCircle className="relative h-20 w-20 text-green-400 animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Verificação Enviada!
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Sua verificação foi enviada via WhatsApp com sucesso. 
              Sistema CSCX operacional! 🚀
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false)
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
                })
              }}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              <Zap className="h-5 w-5 mr-2" />
              Nova Verificação
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header futurístico */}
      <div className="relative z-10">
        <div className="relative bg-gradient-to-br from-orange-500/80 via-red-500/70 via-pink-500/70 to-purple-600/80 backdrop-blur-xl border-b border-white/20 py-16 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/60 via-red-500/50 via-pink-500/50 to-purple-600/60"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-6xl font-black text-white drop-shadow-2xl tracking-tight">
                  VERIFICAÇÃO
                </h1>
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white/90 mb-4 tracking-wide">
                EQUIPAMENTOS
              </h2>
              <div className="flex items-center justify-center space-x-8 text-white/70">
                <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">SEXTA-FEIRA</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                  <Wifi className="h-5 w-5" />
                  <span className="font-medium">SISTEMA ATIVO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header do formulário */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 shadow-2xl">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">SISTEMA DE MONITORAMENTO</h3>
              </div>
              <p className="text-gray-300 text-lg mt-6 max-w-4xl mx-auto leading-relaxed">
                Sistema inteligente de verificação de equipamentos para garantir máxima performance operacional. 
                Monitoramento em tempo real para continuidade dos serviços CSCX.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados pessoais */}
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">IDENTIFICAÇÃO DO OPERADOR</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-cyan-300 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Nome do Operador *
                    </Label>
                    <Input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur-sm h-14 text-lg rounded-xl"
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-cyan-300 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      Código de Acesso
                    </Label>
                    <Input
                      type="text"
                      value={formData.codigoColaborador}
                      onChange={(e) => handleInputChange('codigoColaborador', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur-sm h-14 text-lg rounded-xl"
                      placeholder="Digite seu código"
                    />
                  </div>
                </div>
              </div>

              {/* Equipamentos em grid moderno */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                    <Cpu className="h-8 w-8 text-cyan-400" />
                    DIAGNÓSTICO DE HARDWARE
                    <Cpu className="h-8 w-8 text-cyan-400" />
                  </h3>
                  <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {equipamentos.map((equipamento, index) => {
                    const Icon = equipamento.icon
                    const showOutroField = formData[equipamento.key] === 'Outro'
                    
                    return (
                      <div key={equipamento.key} className="group">
                        <div className={`backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/10 ${equipamento.glowColor} hover:shadow-2xl`}>
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`p-4 rounded-2xl bg-gradient-to-r ${equipamento.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white">{equipamento.label}</h4>
                              <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-1"></div>
                            </div>
                          </div>
                          
                          <RadioGroup
                            value={formData[equipamento.key]}
                            onValueChange={(value) => handleInputChange(equipamento.key, value)}
                            className="space-y-4"
                          >
                            {equipamento.options.map((option) => (
                              <div key={option} className="relative group/option">
                                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer backdrop-blur-sm">
                                  <RadioGroupItem 
                                    value={option} 
                                    id={`${equipamento.key}-${option}`}
                                    className="text-cyan-400 border-2 border-cyan-400/50 w-6 h-6"
                                  />
                                  <Label 
                                    htmlFor={`${equipamento.key}-${option}`}
                                    className="text-white cursor-pointer font-medium flex-1 text-lg"
                                  >
                                    {option}
                                  </Label>
                                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover/option:opacity-100 transition-opacity duration-300"></div>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>

                          {/* Campo de texto para "Outro" */}
                          {showOutroField && (
                            <div className="mt-6 animate-in slide-in-from-top-2 duration-500">
                              <div className="backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-2xl border border-orange-400/30 shadow-inner">
                                <Label className="text-orange-300 font-semibold mb-4 block flex items-center gap-2 text-lg">
                                  <Zap className="h-5 w-5" />
                                  DESCRIÇÃO DO PROBLEMA
                                </Label>
                                <Input
                                  type="text"
                                  value={formData[`${equipamento.key}Outro`]}
                                  onChange={(e) => handleInputChange(`${equipamento.key}Outro`, e.target.value)}
                                  className="bg-white/10 border-orange-400/50 text-white placeholder-gray-300 focus:border-orange-400 focus:ring-orange-400/50 backdrop-blur-sm h-12 rounded-xl"
                                  placeholder="Descreva o problema detectado..."
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sugestões */}
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">RELATÓRIO ADICIONAL</h3>
                </div>
                <Textarea
                  value={formData.sugestoes}
                  onChange={(e) => handleInputChange('sugestoes', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/50 backdrop-blur-sm rounded-xl min-h-32 text-lg"
                  placeholder="Observações, sugestões ou comentários adicionais..."
                  rows={4}
                />
              </div>

              {/* Botão de envio futurístico */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.nome}
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 text-white px-16 py-6 text-xl font-bold disabled:opacity-50 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 disabled:hover:scale-100 rounded-2xl border-0 backdrop-blur-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      PROCESSANDO...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-6 w-6 mr-3" />
                      CONFIRMAR
                      <Zap className="h-6 w-6 ml-3" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default App

