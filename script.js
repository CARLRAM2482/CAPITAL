document.getElementById('startSessionBtn').addEventListener('click', startSession);

async function startSession() {
  const apiKey = "f5AG8vXXwcETKqLi";
  const login = "ramoscausilcarlos52@gmail.com";
  const password = 'ManUnd2482';
  
  try {
    const response = await fetch('https://demo-api-capital.backend-capital.com/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CAP-API-KEY': apiKey
      },
      body: JSON.stringify({
        identifier: login,
        password: password,
        encryptedPassword: false
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      const cst = response.headers.get('CST');
      const xSecurityToken = response.headers.get('X-SECURITY-TOKEN');
      console.log('Session Started', { cst, xSecurityToken });
      
      // Ahora obtenemos datos de mercado
      getMarketData(cst, xSecurityToken, apiKey);
    } else {
      console.error('Error iniciando sesión:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getMarketData(cst, xSecurityToken, apiKey) {
  try {
    const response = await fetch('https://demo-api-capital.backend-capital.com/markets', {
      method: 'GET',
      headers: {
        'X-CAP-API-KEY': apiKey,
        'CST': cst,
        'X-SECURITY-TOKEN': xSecurityToken
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const markets = data.markets.map(market => `<p>${market.name}: ${market.bid}</p>`).join('');
      document.getElementById('marketData').innerHTML = markets;
    } else {
      console.error('Error obteniendo datos de mercado:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
