import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { CheckCircle, Monitor, Headphones, Keyboard, Mouse, Armchair, FootprintsIcon, Laptop, Sparkles, Clock, Calendar, Zap, Shield, Cpu, Wifi, Lock, Eye, EyeOff, Settings, X, Filter, RotateCcw, User, Calendar as CalendarIcon } from 'lucide-react'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'form', 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Admin states
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [adminError, setAdminError] = useState('')
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [verificacoes, setVerificacoes] = useState([])
  const [filtros, setFiltros] = useState({
    nome: '',
    dataInicio: '',
    dataFim: ''
  })
  const [selectedVerificacao, setSelectedVerificacao] = useState(null)

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
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (loginPassword === '20Acesse20#') {
      setIsLoggedIn(true)
      setCurrentView('form')
      setLoginPassword('')
    } else {
      setLoginError('Senha incorreta. Tente novamente.')
    }
    setIsLoggingIn(false)
  }

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setIsAdminLoggingIn(true)
    setAdminError('')

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (adminPassword === 'admin123') {
      setCurrentView('admin')
      setShowAdminLogin(false)
      setAdminPassword('')
      loadVerificacoes()
    } else {
      setAdminError('Senha incorreta. Tente novamente.')
    }
    setIsAdminLoggingIn(false)
  }

  const loadVerificacoes = async () => {
    try {
      const response = await fetch('https://mzhyi8c1zd3x.manus.space/api/verificacoes')
      if (response.ok) {
        const data = await response.json()
        setVerificacoes(data)
      }
    } catch (error) {
      console.error('Erro ao carregar verificações:', error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEquipmentChange = (equipmentKey, value) => {
    setFormData(prev => ({
      ...prev,
      [equipmentKey]: value,
      [`${equipmentKey}Outro`]: value === 'Outro' ? prev[`${equipmentKey}Outro`] : ''
    }))
  }

  const formatWhatsAppMessage = () => {
    const now = new Date()
    const data = now.toLocaleDateString('pt-BR')
    const hora = now.toLocaleTimeString('pt-BR')

    let message = `🔧 *VERIFICAÇÃO DE EQUIPAMENTOS - CSCX*\n\n`
    message += `👤 *Nome:* ${formData.nome}\n`
    message += `🔑 *Código Colaborador:* ${formData.codigoColaborador}\n\n`
    message += `🖥️ *EQUIPAMENTOS:*\n`

    equipamentos.forEach(eq => {
      const status = formData[eq.key]
      const outro = formData[`${eq.key}Outro`]
      if (status) {
        message += `• ${eq.label}: ${status}`
        if (status === 'Outro' && outro) {
          message += `: ${outro}`
        }
        message += `\n`
      } else {
        message += `• ${eq.label}: \n`
      }
    })

    message += `\n💬 *Sugestões/Comentários:* ${formData.sugestoes || 'Nenhuma'}\n\n`
    message += `📅 Data: ${data}\n`
    message += `⏰ Hora: ${hora}\n\n`

    return message
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nome || !formData.codigoColaborador) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    setIsSubmitting(true)

    try {
      // Enviar dados para o backend
      const response = await fetch('https://mzhyi8c1zd3x.manus.space/api/verificacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        
        // Preparar mensagem do WhatsApp com ID do registro
        const whatsappMessage = formatWhatsAppMessage() + `🆔 *Registro ID:* ${result.id}`
        const encodedMessage = encodeURIComponent(whatsappMessage)
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=5532984218936&text=${encodedMessage}&type=phone_number&app_absent=0`
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank')
        
        setSubmitted(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
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
        }, 3000)
      } else {
        throw new Error('Erro ao enviar dados')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao enviar dados. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filtrarVerificacoes = () => {
    return verificacoes.filter(v => {
      const nomeMatch = !filtros.nome || v.nome.toLowerCase().includes(filtros.nome.toLowerCase())
      const dataMatch = (!filtros.dataInicio || new Date(v.data_verificacao) >= new Date(filtros.dataInicio)) &&
                       (!filtros.dataFim || new Date(v.data_verificacao) <= new Date(filtros.dataFim))
      return nomeMatch && dataMatch
    })
  }

  const getStatusColor = (status) => {
    if (status === 'Bom estado') return 'bg-green-500'
    if (status === 'Outro') return 'bg-yellow-500'
    if (status === 'Uso particular') return 'bg-blue-500'
    if (status === 'Não tenho') return 'bg-gray-500'
    return 'bg-gray-400'
  }

  const countProblemas = (verificacao) => {
    let count = 0
    equipamentos.forEach(eq => {
      if (verificacao[eq.key] === 'Outro') count++
    })
    return count
  }

  // Login Screen
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Admin button */}
        <button
          onClick={() => setShowAdminLogin(true)}
          className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <Settings className="w-5 h-5" />
        </button>

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
                    type={showPassword ? "text" : "password"}
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

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-between items-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <button
                    onClick={() => setShowAdminLogin(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    ACESSO ADMINISTRATIVO
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Digite a senha de administrador
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword" className="text-blue-400 font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      SENHA ADMIN
                    </Label>
                    <div className="relative">
                      <Input
                        id="adminPassword"
                        type={showAdminPassword ? "text" : "password"}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Digite a senha de administrador"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {adminError && (
                    <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
                      {adminError}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 transition-all duration-300"
                    disabled={isAdminLoggingIn}
                  >
                    {isAdminLoggingIn ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        VERIFICANDO...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Settings className="w-4 h-4" />
                        ACESSAR ADMIN
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Admin Screen
  if (currentView === 'admin') {
    const verificacoesFiltradas = filtrarVerificacoes()

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Administração CSCX</h1>
                <p className="text-gray-300">Verificação de Equipamentos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{verificacoes.length} registro{verificacoes.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <Button
                onClick={() => setCurrentView('login')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Sair
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-green-400 font-semibold">Nome do Operador</Label>
                  <Input
                    placeholder="Digite o nome..."
                    value={filtros.nome}
                    onChange={(e) => setFiltros(prev => ({ ...prev, nome: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-orange-400 font-semibold">Data Início</Label>
                  <Input
                    type="date"
                    value={filtros.dataInicio}
                    onChange={(e) => setFiltros(prev => ({ ...prev, dataInicio: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-purple-400 font-semibold">Data Fim</Label>
                  <Input
                    type="date"
                    value={filtros.dataFim}
                    onChange={(e) => setFiltros(prev => ({ ...prev, dataFim: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    onClick={() => setFiltros({ nome: '', dataInicio: '', dataFim: '' })}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                  <Button
                    onClick={loadVerificacoes}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verificações List */}
          <div className="space-y-4">
            {verificacoesFiltradas.map((verificacao) => (
              <Card
                key={verificacao.id}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => setSelectedVerificacao(verificacao)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{verificacao.nome}</h3>
                      <p className="text-gray-300">Código: {verificacao.codigo_colaborador}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(verificacao.data_verificacao).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(verificacao.data_verificacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {countProblemas(verificacao) > 0 && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                          {countProblemas(verificacao)} problema{countProblemas(verificacao) !== 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-gray-400">→</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {equipamentos.map((eq) => (
                      <div key={eq.key} className="flex items-center gap-2">
                        <eq.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{eq.label}</span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(verificacao[eq.key])}`}></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {verificacoesFiltradas.length === 0 && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8 text-center">
                <p className="text-gray-300 text-lg">Nenhuma verificação encontrada</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Verification Details Modal */}
        {selectedVerificacao && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl bg-white/10 backdrop-blur-md border-white/20 text-white max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Detalhes da Verificação</CardTitle>
                  <button
                    onClick={() => setSelectedVerificacao(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-400">
                      <User className="w-4 h-4" />
                      <span className="font-semibold">Operador</span>
                    </div>
                    <p className="text-white text-lg">{selectedVerificacao.nome}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-400">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="font-semibold">Data da Verificação</span>
                    </div>
                    <p className="text-white text-lg">
                      {new Date(selectedVerificacao.data_verificacao).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(selectedVerificacao.data_verificacao).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">Código</span>
                    </div>
                    <p className="text-white text-lg">{selectedVerificacao.codigo_colaborador}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Wifi className="w-4 h-4" />
                      <span className="font-semibold">IP Address</span>
                    </div>
                    <p className="text-white text-lg">{selectedVerificacao.ip_address || '127.0.0.1'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Status dos Equipamentos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {equipamentos.map((eq) => (
                      <Card key={eq.key} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <eq.icon className="w-5 h-5 text-orange-400" />
                            <span className="font-semibold text-white">{eq.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedVerificacao[eq.key])}`}></div>
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              selectedVerificacao[eq.key] === 'Bom estado' ? 'bg-green-500/20 text-green-400' :
                              selectedVerificacao[eq.key] === 'Outro' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {selectedVerificacao[eq.key] || 'Não informado'}
                            </span>
                          </div>
                          {selectedVerificacao[eq.key] === 'Outro' && selectedVerificacao[`${eq.key}_outro`] && (
                            <div className="mt-2 p-2 bg-yellow-500/10 border-l-4 border-yellow-500 rounded">
                              <p className="text-yellow-200 text-sm">{selectedVerificacao[`${eq.key}_outro`]}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {selectedVerificacao.sugestoes && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Sugestões/Comentários</h3>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-gray-300">{selectedVerificacao.sugestoes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Form Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
          <CardContent className="p-8 space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Verificação Enviada!</h2>
              <p className="text-gray-300">
                Seus dados foram enviados com sucesso via WhatsApp.
              </p>
            </div>
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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Admin button */}
      <button
        onClick={() => setShowAdminLogin(true)}
        className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20 z-10"
      >
        <Settings className="w-5 h-5" />
      </button>

      <div className="relative z-10 p-4">
        {/* Header */}
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

        <div className="max-w-4xl mx-auto">
          {/* Sistema de Monitoramento */}
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

          {/* Identificação do Operador */}
          <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full">
                  <User className="w-6 h-6 text-white" />
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
                    value={formData.nome}
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
                    value={formData.codigoColaborador}
                    onChange={(e) => handleInputChange('codigoColaborador', e.target.value)}
                    placeholder="Digite seu código"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnóstico de Hardware */}
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
                              value={formData[`${equipamento.key}Outro`]}
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

          {/* Relatório Adicional */}
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
                  value={formData.sugestoes}
                  onChange={(e) => handleInputChange('sugestoes', e.target.value)}
                  placeholder="Descreva observações, sugestões ou comentários adicionais..."
                  className="bg-white/10 border-white/30 text-white placeholder-gray-400 min-h-[100px] text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
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
        </div>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-between items-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  ACESSO ADMINISTRATIVO
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Digite a senha de administrador
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminPassword" className="text-blue-400 font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    SENHA ADMIN
                  </Label>
                  <div className="relative">
                    <Input
                      id="adminPassword"
                      type={showAdminPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Digite a senha de administrador"
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                {adminError && (
                  <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
                    {adminError}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 transition-all duration-300"
                  disabled={isAdminLoggingIn}
                >
                  {isAdminLoggingIn ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      VERIFICANDO...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4" />
                      ACESSAR ADMIN
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default App

