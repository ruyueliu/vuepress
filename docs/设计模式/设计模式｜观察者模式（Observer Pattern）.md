---
title: 设计模式(3) | 观察者模式（Observer Pattern）
date: 2024-03-25
---

# 初识观察者模式
观察者模式（Observer Pattern）是一种软件设计模式，属于行为型模式。它定义了一种一对多的依赖关系，使得当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。观察者模式也被称为发布-订阅（Publish-Subscribe）模式。在观察者模式中，有两种核心角色：

1.  **Subject（主题）**：它是被观察的对象，它维护一组依赖于它的观察者，并提供添加、删除和通知观察者的方法。
2.  **Observer（观察者）**：它是依赖于主题的对象，当主题状态发生变化时，观察者会得到通知并进行相应的更新。
# 优缺点
观察者模式的优点包括：

- **松耦合**：主题和观察者之间的关系是松耦合的，使得它们可以相互独立地变化。
- **可扩展性**：可以方便地增加新的观察者，或者修改现有的观察者，而不需要修改主题的代码。
- **通知机制**：观察者只需要订阅主题，一旦主题状态改变，它们就会自动收到通知，无需手动轮询。

观察者模式虽然有许多优点，但也存在一些缺点，包括：

-  **内存泄漏风险**：如果观察者未正确移除，或者被持续添加，可能导致内存泄漏问题。因为主题会持有对观察者的引用，如果观察者在不再需要时没有被正确移除，那么观察者将会一直存在于主题的观察者列表中，从而无法被垃圾回收。
-  **性能问题**：当主题有大量观察者时，通知所有观察者可能会影响性能，特别是在需要频繁更新的情况下。因为每次状态改变时，都需要遍历观察者列表并通知它们，这可能会导致性能开销。
-  **可能导致意外更新**：观察者模式的设计使得主题的状态改变会导致所有观察者的更新。如果观察者之间存在依赖关系，可能会导致意外的更新序列或循环更新，从而引发不必要的复杂性和错误。
-  **主题状态传递困难**：当主题需要将状态传递给观察者时，可能会面临一些挑战。因为通知观察者时通常只会传递简单的通知，而不会传递更多的上下文信息。这可能需要观察者主动查询主题以获取更多的信息，从而增加了系统的复杂性。
-  **不适合异步处理**：观察者模式通常是同步的，主题状态改变后会立即通知观察者进行更新。这在某些情况下可能会导致问题，特别是在需要异步处理的情况下，例如需要将状态更新推送到远程服务器时，同步通知可能会导致性能问题或阻塞。

总的来说，观察者模式在一些场景下是非常有用的，但在应用时需要注意以上缺点，以避免可能的问题。
观察者模式在实际应用中被广泛采用，例如在 GUI 开发中，当用户与界面交互时，界面可以作为主题，而控制器或其他对象则可以作为观察者，从而实现界面和业务逻辑的解耦。
# 示例代码（使用 Java 实现）
```java
import java.util.ArrayList;
import java.util.List;

// 主题接口
interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// 具体主题类
class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int state;

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
        notifyObservers();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}

// 观察者接口
interface Observer {
    void update();
}

// 具体观察者类
class ConcreteObserver implements Observer {
    private ConcreteSubject subject;

    public ConcreteObserver(ConcreteSubject subject) {
        this.subject = subject;
        subject.registerObserver(this);
    }

    @Override
    public void update() {
        System.out.println("State updated: " + subject.getState());
    }
}

// 测试
public class ObserverPatternExample {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();
        ConcreteObserver observer1 = new ConcreteObserver(subject);
        ConcreteObserver observer2 = new ConcreteObserver(subject);

        // 修改主题状态，观察者将会得到通知并更新
        subject.setState(5);
    }
}
```

在上面的示例中，`ConcreteSubject`是一个具体的主题类，它维护了一个状态，并且具有注册、移除观察者和通知观察者的方法。`ConcreteObserver`是一个具体的观察者类，它实现了观察者接口，并在构造函数中注册到主题中。通过修改主题的状态，观察者会自动更新。
# 有哪些知名的框架采用了观察者模式
在后端开发和中间件领域，有一些知名的框架或中间件采用了观察者模式，以下是其中的一些例子：

1.  **Spring Framework：** Spring 框架中的事件机制就是基于观察者模式实现的。当应用程序中的某些事件发生时，例如上下文加载、Bean 初始化完成等，Spring 会发布相应的事件通知，而监听器（观察者）则可以订阅这些事件并执行相应的操作。
2.  **Node.js：** 虽然 Node.js 在前端开发中更为知名，但它也被广泛应用于后端开发。Node.js 中的事件驱动模型就是基于观察者模式实现的。`EventEmitter` 类充当主题，而事件监听器则充当观察者，当特定事件发生时，`EventEmitter` 会通知所有注册的监听器进行处理。
3.  **Apache Kafka：** Kafka 是一个分布式流处理平台，也是一个消息中间件。它的消息订阅和发布机制就是基于观察者模式实现的。生产者将消息发布到 Kafka 的主题（topic），而消费者则订阅这些主题，当消息到达时，Kafka 会通知所有订阅了该主题的消费者进行消费。
4.  **RabbitMQ：** RabbitMQ 是一个开源的消息队列中间件，它也使用了观察者模式。生产者将消息发送到消息队列，而消费者则订阅队列并接收消息，当消息到达时，RabbitMQ 会通知所有订阅了该队列的消费者进行消费。
5.  **Django 框架：** Django 是一个 Python 的后端 Web 框架，它的信号机制就是基于观察者模式实现的。当某些特定事件发生时（如保存对象前后、用户登录等），Django 会发送信号通知，而信号接收器则可以订阅这些信号并执行相应的处理逻辑。

这些都是在后端开发和中间件领域中广泛使用的框架或中间件，它们都使用了观察者模式来实现事件驱动和消息通知等功能。
观察者模式是非常常用的设计模式，它描述了对象一对多依赖关系下，如何通知并更新的机制，这种机制可以用在前端的 UI 与数据映射、后端的请求与控制器映射，平台间的消息通知等大部分场景，无论现实还是程序中，存在依赖且需要通知的场景非常普遍。
# 常见面试题
在面试中，可能会遇到以下与观察者模式相关的问题，以及相应的答案：

1.  **请解释观察者模式是什么？**
    **答案：** 观察者模式是一种软件设计模式，它定义了一种一对多的依赖关系，使得当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。
2.  **观察者模式中的核心角色有哪些？**
    **答案：** 观察者模式中有两个核心角色：主题（Subject）和观察者（Observer）。主题维护一组依赖于它的观察者，并提供添加、删除和通知观察者的方法；而观察者则依赖于主题，当主题状态发生变化时，观察者会得到通知并进行相应的更新。
3.  **观察者模式和发布-订阅模式有何区别？**
    **答案：** 观察者模式和发布-订阅模式（Pub-Sub）都涉及到对象间的消息通信，但它们之间有一些区别。观察者模式中，主题对象直接通知观察者对象，而发布-订阅模式中，发布者和订阅者之间通过消息代理或中间件进行通信，发布者不直接与订阅者通信。
4.  **如何避免在观察者模式中可能出现的内存泄漏问题？**
    **答案：** 内存泄漏问题可能出现在观察者模式中，特别是在观察者没有正确移除时。为了避免这种问题，可以在主题中使用弱引用来持有观察者，或者在观察者不再需要时手动将其从主题中移除。
5.  **观察者模式的优缺点是什么？**
    **答案：** 观察者模式的优点包括松耦合、可扩展性和通知机制；而缺点包括内存泄漏风险、性能问题、可能导致意外更新等。
6.  **请列举一个实际应用中观察者模式的例子。**
    **答案：** 一个实际应用中观察者模式的例子是电子商务网站中的库存管理系统。库存管理系统是主题，而订单系统、仓库系统等则是观察者，当某个商品的库存数量发生变化时，库存管理系统会通知所有依赖它的观察者更新相关信息，如商品的可售数量、是否需要补货等。
7.  **观察者模式在哪些框架或中间件中得到了应用？**
    **答案：** 观察者模式在许多框架和中间件中得到了应用，例如 Java 的 Swing/AWT、Spring Framework、Node.js、Apache Kafka、RabbitMQ 等。

这些问题可以帮助面试者深入了解观察者模式的概念、应用和实现细节，展现其对软件设计模式的理解和应用能力。
