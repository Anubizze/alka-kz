import emailjs from "@emailjs/browser";

// Инициализация EmailJS
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "R76z8_rjN3YXj448h";
emailjs.init(publicKey);
console.log('🔧 EmailJS: Инициализация с ключом:', publicKey ? '***' : 'не настроен');

export const sendEmail = async (name, phone, email, message) => {
  console.log('📤 UseSendMail: Начинаем отправку письма...')
  console.log('📋 Параметры:', { name, phone, email, message })
  
  // Проверяем, что EmailJS доступен
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS не загружен!')
    return { success: false, error: 'EmailJS не загружен' }
  }

  // Проверяем переменные окружения перед отправкой
  const envVars = {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "R76z8_rjN3YXj448h",
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_unmqhcc",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_8g35gsf",
    recipientEmail: import.meta.env.VITE_RECIPIENT_EMAIL || "haval.semey@mail.ru",
    companyName: import.meta.env.VITE_COMPANY_NAME || "АЛҚА ЛОМБАРД"
  };

  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error('❌ Отсутствуют переменные окружения:', missingVars);
    return { 
      success: false, 
      error: `Отсутствуют переменные окружения: ${missingVars.join(', ')}` 
    };
  }
  
  try {
    const templateParams = {
      // Основные параметры для EmailJS
      to_name: envVars.companyName,
      to_email: envVars.recipientEmail,
      from_name: name,
      from_phone: phone,
      from_email: email,
      message: message,
      reply_to: email,
      
      // Параметры для темы письма (EmailJS автоматически использует subject)
      subject: `Сообщение от ${email}`,
      
      // Дополнительные параметры для EmailJS шаблона
      user_name: name,
      user_phone: phone,
      user_email: email,
      user_message: message,
      company_name: envVars.companyName,
      current_date: new Date().toLocaleDateString('ru-RU'),
      current_time: new Date().toLocaleTimeString('ru-RU'),
      
      // Альтернативные названия для совместимости
      sender_name: name,
      sender_email: email,
      sender_phone: phone,
      sender_message: message
    };
    
    console.log('📝 Параметры шаблона:', templateParams)

    console.log('🔧 EmailJS: Отправляем письмо...')
    console.log('🔧 EmailJS: Service ID:', envVars.serviceId ? '***' : 'не настроен')
    console.log('🔧 EmailJS: Template ID:', envVars.templateId ? '***' : 'не настроен')
    console.log('🔧 EmailJS: Public Key:', envVars.publicKey ? '***' : 'не настроен')
    
    const res = await emailjs.send(
      envVars.serviceId, // Service ID
      envVars.templateId, // Template ID
      templateParams,
      envVars.publicKey // Public Key
    );

    console.log("✅ Письмо отправлено", res.status, res.text);
    return { success: true, data: res };
  } catch (err) {
    console.error("❌ Ошибка отправки:", err);
    
    // Детальная информация об ошибке
    let errorMessage = 'Неизвестная ошибка';
    if (err.text) {
      errorMessage = err.text;
    } else if (err.message) {
      errorMessage = err.message;
    } else if (err.status) {
      errorMessage = `HTTP ${err.status}`;
    }
    
    console.error("📋 Детали ошибки:", {
      text: err.text,
      message: err.message,
      status: err.status,
      response: err.response
    });
    
    return { success: false, error: err, errorMessage };
  }
};
