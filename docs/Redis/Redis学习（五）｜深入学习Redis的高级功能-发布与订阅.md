---
title: Redis学习（五）｜深入学习Redis的高级功能-发布与订阅
date: 2024-04-28
---
<!-- TOC -->
* [原理](#原理)
* [用法](#用法)
  * [适用场景](#适用场景)
* [Kafka vs Redis](#kafka-vs-redis)
  * [Kafka](#kafka)
  * [Redis](#redis)
  * [对比](#对比)
* [代码示例](#代码示例)
<!-- TOC -->

Redis的发布与订阅（Pub/Sub）是一种消息传递模式，它包含两个主要角色：发布者（publisher）和订阅者（subscriber）。发布者向指定的频道（channel）发布消息，而订阅者可以订阅一个或多个频道，并在消息发布到订阅的频道时接收消息通知。
# 原理
Pub/Sub 的实现原理是基于 Redis 的事件通知机制。当发布者向频道发布消息时，Redis会将消息推送给所有订阅了该频道的客户端。这种模式下，发布者和订阅者之间是解耦的，发布者不需要知道谁在订阅消息，订阅者也不需要知道消息来自哪个发布者。
# 用法

1.  **发布消息（PUBLISH）：**
- 发布者通过 PUBLISH 命令向指定的频道发布消息。
2.  **订阅频道（SUBSCRIBE）：**
- 订阅者通过 SUBSCRIBE 命令订阅一个或多个频道，以接收该频道发布的消息。
3.  **取消订阅（UNSUBSCRIBE）：**
- 订阅者可以通过 UNSUBSCRIBE 命令取消对指定频道的订阅，或者使用 UNSUBSCRIBE * 取消对所有频道的订阅。
4.  **模式匹配订阅（PSUBSCRIBE）：**
- 订阅者可以通过 PSUBSCRIBE 命令订阅一个或多个符合指定模式的频道，以接收匹配频道发布的消息。
5.  **取消模式匹配订阅（PUNSUBSCRIBE）：**
- 订阅者可以通过 PUNSUBSCRIBE 命令取消对指定模式的订阅，或者使用 PUNSUBSCRIBE * 取消对所有模式的订阅。
## 适用场景

1.  **实时通知和消息推送：**
- 可以用于实现实时通知和消息推送功能，比如实时聊天应用中的消息通知。
2.  **事件驱动编程：**
- 可以用于实现事件驱动编程模型，让订阅者监听特定事件并执行相应的逻辑。
3.  **日志处理和监控系统：**
- 可以用于构建日志处理和监控系统，让订阅者监听特定的日志频道并进行日志分析或告警处理。
4.  **实时数据同步：**
- 可以用于实现实时数据同步，订阅者可以监听数据变更的频道并同步数据到其他系统或组件。
5.  **分布式系统协调：**
- 可以用于分布式系统中的服务协调和通信，订阅者可以监听特定的频道来获取其他服务的状态或执行特定的操作。

Pub/Sub模式的优点是实现简单，可扩展性好，适用于实时消息传递和事件驱动的应用场景。然而，它也有一些局限性，比如不支持消息持久化和消息重试等特性，因此在一些要求数据安全性和可靠性的场景下可能不够适用。
# Kafka vs Redis
Kafka和Redis都是流行的消息传递系统，它们都支持发布与订阅（Pub/Sub）模式，但在设计理念、特性和适用场景上有一些区别：
## Kafka

1.  **设计理念：**
- Kafka是一个分布式消息队列系统，设计用于处理大规模的实时数据流。它采用了分布式日志存储和基于分区的消息传递模型，支持高吞吐量和持久化存储。
2.  **特性：**
- 持久化存储：Kafka消息持久化到磁盘，保证消息不会丢失。
- 分区和副本：Kafka将消息分为多个分区，并在集群中复制多个副本，实现高可用性和负载均衡。
- 消息顺序保证：Kafka保证同一分区内的消息顺序性。
- 消费者组：Kafka支持多个消费者组，每个消费者组可以独立消费同一个主题的消息。
- 消息持久化时间：Kafka支持配置消息的持久化时间，可以根据需求自定义消息保留时间。
3.  **适用场景：**
- 实时数据流处理：适用于处理大规模的实时数据流，如日志收集、事件处理等。
- 消息队列：适用于构建消息队列系统，实现应用之间的解耦和异步通信。
- 流式处理：适用于构建实时流式处理应用，如实时分析、数据管道等。
## Redis

1.  **设计理念：**
- Redis是一个内存数据库和缓存系统，设计用于提供高性能的键值存储和数据结构操作。它支持多种数据结构和丰富的功能，包括字符串、哈希表、列表、集合、有序集合等。
2.  **特性：**
- 内存存储：Redis将数据存储在内存中，提供高速的读写性能。
- 发布与订阅：Redis支持发布与订阅模式，可以用于实现实时消息传递和事件驱动编程。
- 数据结构操作：Redis支持多种数据结构和丰富的功能，如字符串操作、哈希表操作、列表操作等。
- 持久化存储：Redis支持多种持久化方式，可以将数据持久化到磁盘，保证数据不会丢失。
3.  **适用场景：**
- 缓存系统：适用于构建高性能的缓存系统，提升应用的访问速度。
- 会话存储：适用于存储会话信息和用户状态，实现会话共享和状态管理。
- 实时消息传递：适用于实现实时消息传递和事件通知，如聊天应用、通知系统等。
## 对比

1.  **数据持久化：**
- Kafka支持消息持久化到磁盘，保证消息不会丢失；Redis也支持持久化存储，但是主要是为了数据恢复而不是消息传递的持久化。
2.  **消息顺序保证：**
- Kafka保证同一分区内的消息顺序性；Redis的Pub/Sub模式下消息的顺序并不是严格保证的。
3.  **适用场景：**
- Kafka适用于处理大规模的实时数据流和构建实时流式处理应用；Redis适用于构建高性能的缓存系统和实现实时消息传递。
4.  **延迟：**
- Kafka的延迟较低，适用于要求实时性较高的场景；Redis的延迟也较低，但受网络和服务器性能影响，不如Kafka的延迟稳定。

综上所述，Kafka和Redis都是优秀的消息传递系统，各有其特点和适用场景。选择合适的系统取决于具体的需求和应用场景。
# 代码示例
下面是一个直接可执行的示例，演示了如何在Spring Boot中使用Redis的发布与订阅功能：
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@SpringBootApplication
public class PubSubExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(PubSubExampleApplication.class, args);
    }

    @Bean
    public RedisMessageListenerContainer container(RedisTemplate<String, String> redisTemplate) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisTemplate.getConnectionFactory());
        return container;
    }

    @Bean
    public PubSubExample pubSubExample(RedisTemplate<String, String> redisTemplate, RedisMessageListenerContainer container) {
        return new PubSubExample(redisTemplate, container);
    }
}

class PubSubExample {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedisMessageListenerContainer container;

    public PubSubExample(RedisTemplate<String, String> redisTemplate, RedisMessageListenerContainer container) {
        this.redisTemplate = redisTemplate;
        this.container = container;
    }

    // 发布消息
    public void publishMessage(String channel, String message) {
        redisTemplate.convertAndSend(channel, message);
    }

    // 订阅频道
    public void subscribeChannel(String channel) {
        container.addMessageListener(new MessageListenerAdapter(new MessageListener() {
            @Override
            public void onMessage(Message message, byte[] pattern) {
                System.out.println("Received message: " + new String(message.getBody()));
            }
        }), new ChannelTopic(channel));
    }
}
```

在这个示例中，创建了一个Spring Boot应用，并定义了一个`PubSubExample`类来管理Redis的发布与订阅功能。在`PubSubExample`类中，定义了`publishMessage`方法用于发布消息，以及`subscribeChannel`方法用于订阅频道。在Spring Boot应用的启动类中，创建了一个`RedisMessageListenerContainer` bean，并将其注入到`PubSubExample`类中，以便订阅频道时使用。
可以直接运行这个示例，然后在另一个客户端使用Redis客户端工具（如redis-cli）订阅相同的频道，然后通过调用`publishMessage`方法来发布消息，就可以在订阅端收到消息了。
