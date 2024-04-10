---
title: 设计模式(7)｜命令模式（Command Pattern）
date: 2024-04-04
---
命令模式（Command Pattern）是一种行为设计模式，它允许将请求封装成对象，从而使你可以参数化其他对象对请求的执行。在命令模式中，请求的发送者和接收者之间不直接交互，而是通过一个命令对象来解耦。这使得请求发送者无需知道请求的具体操作或者接收者，从而增强了系统的灵活性和可扩展性。
# 结构
在命令模式中通常包含以下角色：
1. Command（命令）：声明执行操作的接口，通常包含一个执行操作的方法（如 execute()）。
2. ConcreteCommand（具体命令）：实现 Command 接口，负责调用接收者执行请求。
3. Receiver（接收者）：接收者知道如何实施与执行一个请求相关的操作。
4. Invoker（调用者）：调用者发送命令并执行请求。
5. Client（客户端）：创建具体命令对象并设置其接收者，然后将命令对象传递给调用者。
# 优缺点
命令模式是一种灵活且功能强大的设计模式，主要优点是它允许在不修改现有客户端代码的情况下添加新的命令。此外，通过使用命令模式，可以将操作记录到日志中、撤销操作或者将操作进行队列化等，同时他也有一些缺点。
## 优点

1.  解耦性：命令模式通过将请求发送者与接收者解耦，使得请求发送者不需要知道接收者的具体实现细节，从而增强了系统的灵活性和可维护性。
2.  可扩展性：通过添加新的具体命令类，可以很容易地扩展系统的功能，而不需要修改已有的代码。
3.  支持撤销和重做：命令模式可以记录请求的历史操作，从而支持对操作的撤销和重做，提供了更好的用户体验。
4.  支持日志和队列：可以将命令对象保存在日志中，实现系统的日志记录功能。此外，命令对象还可以组织成队列，实现命令的批处理和延迟执行。
## 缺点

1.  类的数量增加：引入命令模式会增加系统中的类的数量，特别是在有大量具体命令类的情况下，可能会导致类的数量激增，增加了系统的复杂性。
2.  命令的单一性：每个具体命令类通常只封装了一个特定的操作，这可能会导致系统中存在大量的具体命令类，增加了系统的管理和维护成本。
3.  对象间的调用链可能过长：在命令模式中，请求发送者、命令对象、接收者之间可能存在多层的调用链，特别是在复杂的系统中，可能会导致调用链过长，影响系统的性能。

虽然命令模式有一些缺点，但在很多场景下仍然是一种非常有用的设计模式，特别是在需要支持撤销、重做、日志记录和队列等功能的情况下。
# 使用命令模式的步骤
使用命令模式可以通过以下步骤进行：

1.  **确定参与者**：首先，确定在系统中谁是命令的发起者（Invoker）、命令的接收者（Receiver）、以及具体的命令对象（Command）。
2.  **定义命令接口**：创建一个命令接口，其中包含一个执行操作的方法（如 `execute()`）。这个接口可以是抽象类或者接口，具体取决于设计的需求。
3.  **实现具体命令类**：针对每个具体的操作，创建一个具体的命令类，实现命令接口，并在其中封装具体的操作实现。
4.  **创建接收者类**：定义接收者类，实现命令所需的具体操作。
5.  **创建调用者类**：创建一个调用者类，负责向具体的命令对象发送请求。
6.  **创建客户端代码**：在客户端代码中创建具体的命令对象，并将其关联到调用者对象上。
# 示例
下面是一个简单的示例，演示如何使用命令模式：

```python
// 步骤1: 定义命令接口
interface Command {
    void execute();
}

// 步骤2: 创建具体命令类
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOn();
    }
}

class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOff();
    }
}

// 步骤3: 创建接收者类
class Light {
    public void turnOn() {
        System.out.println("Light is on");
    }

    public void turnOff() {
        System.out.println("Light is off");
    }
}

// 步骤4: 创建调用者类
class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        if (command != null) {
            command.execute();
        }
    }
}

// 步骤5: 创建客户端代码
public class Main {
    public static void main(String[] args) {
        Light light = new Light();
        Command lightOnCommand = new LightOnCommand(light);
        Command lightOffCommand = new LightOffCommand(light);

        RemoteControl remoteControl = new RemoteControl();

        remoteControl.setCommand(lightOnCommand);
        remoteControl.pressButton(); // 输出：Light is on

        remoteControl.setCommand(lightOffCommand);
        remoteControl.pressButton(); // 输出：Light is off
    }
}

```
在这个示例中，`Command` 接口定义了命令的执行方法 `execute()`。`LightOnCommand` 和 `LightOffCommand` 类是具体的命令类，负责调用接收者（`Light`）的相应方法。`Light` 类表示接收者，具体执行命令的动作。`RemoteControl` 类作为调用者，持有命令对象，并在调用 `pressButton()` 方法时执行命令。在客户端代码中，首先创建具体的命令对象，然后设置到遥控器对象中，最后通过遥控器执行命令。
# 命令模式的撤销和重做
命令模式支持撤销和重做的机制是通过保存命令的历史记录来实现的。具体来说，当执行一个命令时，不仅会执行相应的操作，还会将该命令对象保存到一个历史记录中。这样，在需要撤销或重做操作时，可以从历史记录中获取相应的命令对象，并重新执行或者撤销该命令。

下面是命令模式如何支持撤销和重做的简要流程：

1.  **执行命令并保存历史记录**：当执行一个命令时，不仅会执行相应的操作，还会将该命令对象保存到一个历史记录中，通常使用堆栈（stack）或者列表（list）来保存。
2.  **撤销操作**：当需要撤销一个操作时，可以从历史记录中获取最近一次执行的命令对象，并调用其撤销操作的方法。撤销操作通常是命令对象的一个反向操作，用于恢复到执行命令前的状态。
3.  **重做操作**：当需要重做一个操作时，可以从历史记录中获取最近一次撤销的命令对象，并重新执行该命令对象的操作。重做操作通常与撤销操作相反，用于恢复到执行命令后的状态。

下面是一个简单的示例，演示命令模式如何支持撤销和重做：

```java
import java.util.Stack;

// 步骤1: 定义命令接口
interface Command {
    void execute();
    void undo();
}

// 步骤2: 创建具体命令类
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOn();
    }

    public void undo() {
        light.turnOff();
    }
}

class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOff();
    }

    public void undo() {
        light.turnOn();
    }
}

// 步骤3: 创建接收者类
class Light {
    public void turnOn() {
        System.out.println("Light is on");
    }

    public void turnOff() {
        System.out.println("Light is off");
    }
}

// 步骤4: 创建调用者类
class RemoteControl {
    private Stack<Command> history = new Stack<>();

    public void executeCommand(Command command) {
        command.execute();
        history.push(command);
    }

    public void undoLastCommand() {
        if (!history.isEmpty()) {
            Command command = history.pop();
            command.undo();
        }
    }
}

// 步骤5: 创建客户端代码
public class Main {
    public static void main(String[] args) {
        Light light = new Light();
        Command lightOnCommand = new LightOnCommand(light);
        Command lightOffCommand = new LightOffCommand(light);

        RemoteControl remoteControl = new RemoteControl();

        remoteControl.executeCommand(lightOnCommand); // 输出：Light is on
        remoteControl.undoLastCommand(); // 输出：Light is off
        remoteControl.executeCommand(lightOffCommand); // 输出：Light is off
        remoteControl.undoLastCommand(); // 输出：Light is on
    }
}
```

在这个示例中，`RemoteControl` 类维护了一个命令历史记录的堆栈。当执行一个命令时，会将命令对象压入堆栈中，当需要撤销操作时，会从堆栈中弹出最近一次执行的命令对象，并调用其撤销方法。
# 采用命令模式的常见场景
命令模式在许多场景中都可以发挥作用，特别是在需要将请求封装成对象并进行参数化、排队、记录日志、撤销或重做等操作时。以下是一些常见的采用命令模式的场景：

1.  **GUI 应用程序**：在图形用户界面（GUI）应用程序中，例如按钮、菜单项和快捷键等用户交互元素通常会使用命令模式。每个用户操作都可以被封装成一个命令对象，当用户触发操作时，相应的命令对象被执行，从而实现了请求发送者和接收者的解耦。
2.  **数据库事务**：在数据库交互中，命令模式常常用于实现事务操作。每个数据库操作（例如插入、更新、删除）都可以被封装成一个命令对象，这些命令对象可以被组织成一个事务，从而实现事务的原子性、一致性、隔离性和持久性（ACID 属性）。
3.  **日志记录**：在需要记录系统操作历史或事件的场景中，命令模式可以被用来实现日志记录功能。每个操作都可以被封装成一个命令对象，并且被记录到日志中，以便后续审查、排查问题或者执行回滚操作。
4.  **撤销和重做功能**：在需要支持撤销和重做功能的应用程序中，命令模式可以被用来实现这些功能。每个用户操作都可以被封装成一个命令对象，并且被保存到历史记录中。当用户需要撤销或重做操作时，可以从历史记录中获取相应的命令对象并执行。
5.  **多级菜单**：在包含多级菜单结构的应用程序中，命令模式可以被用来管理菜单项之间的关系。每个菜单项都可以被封装成一个命令对象，从而使得菜单的添加、移动、删除等操作更加灵活和易于维护。

这些是一些常见的场景，适合采用命令模式来实现。命令模式的灵活性和可扩展性使得它适用于各种不同的应用场景，可以提高系统的模块化程度、降低耦合度，并且使得系统更易于维护和扩展。
# 常见面试题
在面试中，关于命令模式的问题可能涉及其定义、优点、缺点、实现方式、适用场景等方面。以下是一些可能会被问到的问题以及相应的答案：

1.  **命令模式是什么？**
    答案：命令模式是一种行为设计模式，它允许将请求封装成对象，从而使得请求的发送者和接收者之间解耦。在命令模式中，请求的发送者将请求封装成一个命令对象，并将其发送给接收者，接收者负责执行具体的操作。
2.  **命令模式的优点有哪些？**
    答案：命令模式的优点包括：
- 解耦性：命令模式可以将请求发送者和接收者解耦，使得系统的各个部分之间相互独立，易于维护和扩展。
- 可扩展性：通过添加新的具体命令类，可以很容易地扩展系统的功能，而不需要修改已有的代码。
- 支持撤销和重做：命令模式可以记录请求的历史操作，从而支持对操作的撤销和重做，提供了更好的用户体验。
- 支持日志和队列：可以将命令对象保存在日志中，实现系统的日志记录功能。此外，命令对象还可以组织成队列，实现命令的批处理和延迟执行。
3.  **命令模式的缺点是什么？**
    答案：命令模式的缺点包括：
- 类的数量增加：引入命令模式会增加系统中的类的数量，可能导致类的数量激增，增加了系统的复杂性。
- 命令的单一性：每个具体命令类通常只封装了一个特定的操作，可能会导致系统中存在大量的具体命令类，增加了系统的管理和维护成本。
- 对象间的调用链可能过长：在命令模式中，请求发送者、命令对象、接收者之间可能存在多层的调用链，可能会导致调用链过长，影响系统的性能。
4.  **命令模式的应用场景有哪些？**
    答案：命令模式适用于以下场景：
- 需要将请求发送者和接收者解耦的场景。
- 需要支持撤销、重做、日志记录和队列等功能的场景。
- 需要支持事务操作的场景。
- 需要支持多级菜单结构的场景。
- 需要实现请求的参数化、排队和执行操作的场景。

以上是一些常见的和命令模式相关的问题以及相应的答案，方便更好的理解命令模式。