---
title: 设计模式(6)｜责任链模式（Chain of Responsibility Pattern）
date: 2024-04-04
---
@[toc]
责任链模式（Chain of Responsibility Pattern）是一种行为设计模式，它允许你创建一个对象链。请求将沿着这个链传递，直到有一个对象处理它为止。这种模式可以使请求的发送者和接收者解耦。
当想让一个以上的对象有机会能够处理同一请求的时候，就可以使用责任链模式（Chanin of Responsibility Pattem）
# 结构

1.  **抽象处理者（Handler）**：定义了一个处理请求的接口。通常包含一个指向下一个处理者的引用。
2.  **具体处理者（Concrete Handler）**：实现了处理请求的具体逻辑。如果能够处理请求，就处理之；否则将请求传递给下一个处理者。
# 优点

- 解耦了请求发送者和接收者，增强了系统的灵活性。
- 可以动态地增加或修改处理者。
- 简化了对象，每个具体处理者只需关注自己的业务逻辑。
# 缺点

- 请求的处理可能会传递到链的末端仍未被处理。
- 可能会影响性能，特别是在链较长时。
- 如果链设置不当，可能会导致循环引用。
# 使用责任链的步骤
为请求创建一个对象链，每个对象依次检查此请求，并对其进行处理，或者将其传递给链中的下一个对象；
链中的每一个对象都需要扮演一个处理器，并且有一个后继对象，如果他可以处理请求，就进行处理，如果不能，就将请求转发给后继者
# 示例
考虑一个简单的审批流程，包括经理、部门主管和CEO三个级别的审批。在这个场景中，责任链模式可以很好地应用。

```python
// 抽象处理者
abstract class Handler {
    protected Handler successor;

    public void setSuccessor(Handler successor) {
        this.successor = successor;
    }

    public abstract void handleRequest(String request);
}

// 具体处理者1
class Manager extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("manager")) {
            System.out.println("Manager approved the request.");
        } else {
            System.out.println("Manager cannot handle the request.");
            if (successor != null) {
                successor.handleRequest(request);
            }
        }
    }
}

// 具体处理者2
class DepartmentHead extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("department_head")) {
            System.out.println("Department Head approved the request.");
        } else {
            System.out.println("Department Head cannot handle the request.");
            if (successor != null) {
                successor.handleRequest(request);
            }
        }
    }
}

// 具体处理者3
class CEO extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("CEO")) {
            System.out.println("CEO approved the request.");
        } else {
            System.out.println("CEO cannot handle the request.");
            if (successor != null) {
                successor.handleRequest(request);
            }
        }
    }
}

// 客户端
public class Main {
    public static void main(String[] args) {
        // 创建具体处理者对象
        Handler manager = new Manager();
        Handler departmentHead = new DepartmentHead();
        Handler ceo = new CEO();

        // 设置责任链
        manager.setSuccessor(departmentHead);
        departmentHead.setSuccessor(ceo);

        // 发送请求
        manager.handleRequest("department_head");
        manager.handleRequest("manager");
        manager.handleRequest("CEO");
        manager.handleRequest("other");
    }
}

```

在这个示例中，`**Handler**`是抽象处理者，包含了一个指向下一个处理者的引用。` **Manager**`、` `**DepartmentHead**`和`**CEO**`是具体的处理者，它们实现了`**handleRequest**`方法来处理请求。在客户端代码中，首先创建具体处理者对象，然后设置责任链，并发送请求。
# 有哪些知名框架采用了责任链模式
责任链模式在许多知名的框架和库中都有应用。以下是一些采用责任链模式的知名框架和库的例子：

1.  **Java Servlet 中的 Filter Chain**：Java Servlet 中的过滤器（Filter）是一个典型的责任链模式的实现。多个过滤器按照顺序组成一个链，每个过滤器都有机会处理请求，或将请求传递给下一个过滤器。
2.  **Spring 框架中的拦截器（Interceptor）**：Spring 框架中的拦截器也是一种责任链模式的应用。拦截器可以在控制器方法执行之前或之后执行特定的逻辑，多个拦截器按照配置顺序形成一个链。
3.  **Node.js 中的 Connect 和 Express 框架**：Connect 和 Express 框架中的中间件（Middleware）也采用了责任链模式的思想。多个中间件按照顺序组成一个链，每个中间件都有机会处理请求，或将请求传递给下一个中间件。
4.  **.NET Core 中的中间件**：在 .NET Core 中，使用中间件来处理 HTTP 请求。类似于 Node.js 中的中间件，中间件按照顺序形成一个链，每个中间件都有机会处理请求，或将请求传递给下一个中间件。
5.  **Android 中的事件传递机制**：在 Android 中，事件传递机制也可以看作是责任链模式的一种应用。当用户触摸屏幕时，事件首先传递给顶层的 View，然后逐级向下传递，直到某个 View 处理了事件为止。

这些是一些采用责任链模式的知名框架和库的例子，它们充分利用了责任链模式的灵活性和可扩展性，使得代码更加模块化和易于维护。
# 责任链模式和链表有什么关联
责任链模式和链表之间有一些相似之处，主要体现在它们的结构特点和数据流动方式上。具体来说，它们的关联在于：

1.  **链式结构：**
- 责任链模式中的处理者对象按照一定的顺序连接成链，每个处理者都持有对下一个处理者的引用。这种结构类似于链表中节点之间的链接。
- 链表也是一种链式结构，由节点组成，每个节点包含对下一个节点的引用。
2.  **数据流动：**
- 在责任链模式中，请求沿着责任链流动，每个处理者都有机会处理请求或将请求传递给下一个处理者。这种数据的传递和处理方式类似于链表中数据元素的遍历。
- 链表中的数据元素通过节点之间的引用进行流动和访问，可以顺序地遍历整个链表。

虽然责任链模式和链表在结构上有相似之处，并且都涉及到数据的顺序流动，但它们的目的和应用场景不同。责任链模式用于实现请求的传递和处理，而链表用于组织和存储数据。因此，虽然有关联，但它们在概念上和实际应用中的作用是不同的。
# 常见面试题
在面试中，关于责任链模式的问题可能涉及其原理、优缺点、应用场景以及实际应用等方面。以下是一些可能的问题以及相应的答案：

1.  **责任链模式的原理是什么？**
    **答案：** 责任链模式是一种行为设计模式，其中多个对象按照顺序组成链，每个对象都有机会处理请求或将请求传递给下一个对象。请求在链上传递，直到被处理或者达到链的末端。
2.  **责任链模式的优点有哪些？**
    **答案：**
- 解耦了请求发送者和接收者，增强了系统的灵活性和可维护性。
- 可以动态地增加或修改处理者，无需修改客户端代码。
- 简化了对象，每个具体处理者只需关注自己的业务逻辑。
3.  **责任链模式的缺点是什么？**
    **答案：**
- 可能会导致请求的处理延迟，特别是在链较长时。
- 如果责任链设置不当，可能会导致请求无法被处理或形成循环引用。
- 请求可能会到达链的末端仍未被处理。
4.  **责任链模式在什么情况下适用？**
    **答案：**
- 当有多个对象可以处理同一请求，但具体处理者未知时。
- 当需要在运行时动态确定处理请求的对象时。
- 当想要将请求的发送者和接收者解耦时。
5.  **能否举例说明一个实际应用场景中如何使用责任链模式？**
    **答案：** 例如，在一个在线购物系统中，可以应用责任链模式来处理退款请求。不同级别的管理人员可以处理不同金额范围的退款请求，如普通员工可以处理小额退款，主管可以处理中额退款，高级管理人员可以处理大额退款。当有退款请求时，系统首先将请求发送给普通员工，如果金额超出其处理范围，则将请求传递给主管，以此类推，直到有人处理请求或者到达责任链的末端。 
