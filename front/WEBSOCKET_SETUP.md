# Configuração do WebSocket para Chat em Tempo Real

## 1. Instalar Dependências

Execute o seguinte comando no terminal (PowerShell):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd "c:\Users\SecEdu\Documents\GitHub\EcodescApp\front"
npm install @stomp/stompjs sockjs-client
```

**Nota:** Usamos `@stomp/stompjs` (versão moderna) ao invés de `stompjs` (antiga) para evitar conflitos com módulos do Node.js no navegador.

## 2. Configuração do Backend (Spring Boot)

### 2.1. Adicionar dependências no `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

### 2.2. Criar classe de configuração WebSocket:

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }
}
```

### 2.3. Criar modelo de mensagem:

```java
public class ChatMessage {
    private String id;
    private Long senderId;
    private Long recipientId;
    private Long adId;
    private Long produtoId;
    private String content;
    private String timestamp;
    private boolean lida;
    
    // Getters e Setters
}
```

### 2.4. Criar controlador WebSocket:

```java
@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage message, Principal principal) {
        // Salvar mensagem no banco de dados (opcional)
        // chatMessageRepository.save(message);
        
        // Enviar para o destinatário específico
        messagingTemplate.convertAndSendToUser(
            message.getRecipientId().toString(),
            "/queue/messages",
            message
        );
        
        // Também enviar para o canal do produto (para múltiplos usuários)
        messagingTemplate.convertAndSend(
            "/topic/produto/" + message.getAdId(),
            message
        );
    }
}
```

## 3. Funcionalidades Implementadas no Frontend

### ✅ Conexão WebSocket
- Conexão automática ao entrar no chat
- Reconexão automática em caso de falha (5 segundos)
- Desconexão ao sair da página

### ✅ Envio de Mensagens
- Mensagens enviadas via WebSocket em tempo real
- Feedback visual imediato ao enviar
- Validação de conexão antes de enviar

### ✅ Recebimento de Mensagens
- Inscrição em canais privados (`/user/queue/messages`)
- Inscrição em canal do produto (`/topic/produto/{id}`)
- Detecção de duplicatas
- Scroll automático para nova mensagem

### ✅ Indicador de Status
- Badge visual mostrando status da conexão (Online/Offline)
- Ícone de WiFi com cores diferentes (verde/vermelho)

## 4. URL do WebSocket

Por padrão, o WebSocket está configurado para:

```typescript
private wsUrl: string = 'http://localhost:8080/ws-chat';
```

**Para produção**, altere em `chat-anuncio.page.ts`:

```typescript
private wsUrl: string = 'https://seuservidor.com/ws-chat';
```

## 5. Estrutura da Mensagem

### Enviada pelo Frontend:
```json
{
  "senderId": 1,
  "recipientId": 2,
  "adId": 5,
  "produtoId": 5,
  "content": "Olá! Ainda está disponível?",
  "timestamp": "2025-11-26T10:30:00.000Z"
}
```

### Recebida pelo Frontend:
```json
{
  "id": "123",
  "senderId": 2,
  "recipientId": 1,
  "adId": 5,
  "produtoId": 5,
  "content": "Sim, está disponível!",
  "timestamp": "2025-11-26T10:31:00.000Z",
  "lida": false
}
```

## 6. Testes

1. Abra dois navegadores/abas diferentes
2. Faça login com usuários diferentes
3. Acesse o mesmo produto em ambos
4. Envie mensagens e veja a atualização em tempo real

## 7. Observações

- O WebSocket requer que o backend esteja rodando
- Se o WebSocket não conectar, as mensagens não serão enviadas
- O sistema tenta reconectar automaticamente a cada 5 segundos
- Mensagens são adicionadas localmente para feedback imediato
- Duplicatas são evitadas automaticamente
