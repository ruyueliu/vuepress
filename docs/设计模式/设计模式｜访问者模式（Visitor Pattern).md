---
title: 设计模式(12)｜访问者模式（Visitor Pattern)
date: 2024-04-16
---
访问者模式是一种行为设计模式，它允许在不改变已有类的情况下定义一组新的操作。
这些操作通常分散在不同的类中，但是希望能够对这些类的对象进行统一的处理。
访问者模式的核心思想是将操作从对象结构中分离出来，使得可以在不改变这些对象的前提下定义新的操作。
# 结构
访问者模式的结构包括以下主要组成部分：

1.  **抽象元素（Element）：**
- 定义了一个接口，声明了接受访问者对象的accept方法，该方法通常以访问者作为参数。抽象元素可以是一个接口或抽象类，它定义了访问者可以访问的对象的通用接口。
2.  **具体元素（ConcreteElement）：**
- 实现了抽象元素接口，提供了具体的实现，包含了具体的业务逻辑。每个具体元素都必须实现accept方法，该方法将自身作为参数传递给访问者。
3.  **抽象访问者（Visitor）：**
- 定义了一个访问接口，声明了一组访问方法，每个方法对应一个具体元素的访问操作。抽象访问者可以是一个接口或抽象类，它定义了访问者可以执行的操作。
4.  **具体访问者（ConcreteVisitor）：**
- 实现了抽象访问者接口，提供了具体的访问操作。每个具体访问者都必须实现抽象访问者中声明的所有访问方法，以便对具体元素进行访问。
5.  **对象结构（Object Structure）：**
- 包含了一组具体元素对象，可以是一个集合、列表、树等数据结构。对象结构通常提供了一个接口或方法来允许访问者访问其中的元素。

通过以上组成部分的协作，访问者模式实现了对一个对象结构中的元素进行多种不同操作的能力，同时又保持了元素类和操作的解耦合。
# 举例
1.  **动物园游客参观动物：** 想象你去动物园参观，动物园中有许多不同的动物，比如狮子、大象、长颈鹿等。你可以作为一个访问者，对每种动物进行不同的操作，比如观察、喂食、拍照等。这里的动物就是对象结构，而你的行为就是访问者模式中的访问者，可以对不同的动物执行不同的操作。
2.  **超市购物：** 当你去超市购物时，你可能会购买不同种类的商品，比如水果、蔬菜、零食等。你可以把超市看作是一个对象结构，不同种类的商品是其中的元素，而你的购物清单就是访问者模式中的访问者，可以对不同种类的商品执行不同的操作，比如购买、放回货架等。
3.  **家庭医生给病人检查：** 假设你去看家庭医生，医生可能会对你进行身体检查，比如量体温、听心跳、观察症状等。在这个例子中，你是医生的访问者，医生是对象结构，而不同的检查项目是医生可以执行的操作。

这些例子虽然简单，但可以帮助理解访问者模式的基本概念：访问者可以对一个对象结构中的元素执行不同的操作，而不需要修改元素的类。
# 优缺点
## 优点
1. 分离关注点：访问者模式将数据结构和对数据结构的操作分离开来，使得各自的变化不会影响到对方，从而实现了关注点的分离。
2. 新功能扩展方便：通过添加新的访问者类，可以很方便地在不改变现有类的情况下，扩展对数据结构的操作。
3. 符合开闭原则：访问者模式通过在不改变现有代码的情况下，添加新的操作，符合开闭原则，使得系统更加容易扩展和维护。
## 缺点
1. 增加新的元素类困难：如果要在系统中添加新的元素类，需要修改所有的访问者类，以便它们能够处理新的元素类。这违背了开闭原则，使得系统的扩展性降低。
2. 破坏封装：访问者模式将数据结构的内部细节暴露给了访问者类，破坏了数据结构的封装性，使得数据结构更加脆弱。
3. 可读性降低：访问者模式会导致系统中的类和类之间的关系变得更加复杂，降低了代码的可读性和可维护性。

综合考虑，访问者模式适用于对数据结构中的元素进行多种不同的操作，且数据结构的类层次比较稳定的情况下。但是，需要注意其可能带来的缺点，特别是在系统需要频繁扩展新的元素类时，可能会增加系统的维护成本。

# 代码示例
假设有一个几何图形类层次结构，包括圆形（Circle）和矩形（Rectangle），我们想要实现两种不同的操作：计算图形的面积和计算图形的周长。

首先，定义几何图形的接口和两种不同的访问者：

```java
// 几何图形接口
interface Shape {
    void accept(Visitor visitor);
}

// 圆形类
class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 矩形类
class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 访问者接口
interface Visitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}

// 面积计算器
class AreaCalculator implements Visitor {
    private double totalArea = 0;

    @Override
    public void visit(Circle circle) {
        totalArea += Math.PI * circle.getRadius() * circle.getRadius();
    }

    @Override
    public void visit(Rectangle rectangle) {
        totalArea += rectangle.getWidth() * rectangle.getHeight();
    }

    public double getTotalArea() {
        return totalArea;
    }
}

// 周长计算器
class PerimeterCalculator implements Visitor {
    private double totalPerimeter = 0;

    @Override
    public void visit(Circle circle) {
        totalPerimeter += 2 * Math.PI * circle.getRadius();
    }

    @Override
    public void visit(Rectangle rectangle) {
        totalPerimeter += 2 * (rectangle.getWidth() + rectangle.getHeight());
    }

    public double getTotalPerimeter() {
        return totalPerimeter;
    }
}
```

然后，创建一些几何图形对象，并使用访问者进行操作：

```java
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(5), new Rectangle(3, 4), new Circle(2.5) };

        // 计算面积
        AreaCalculator areaCalculator = new AreaCalculator();
        for (Shape shape : shapes) {
            shape.accept(areaCalculator);
        }
        System.out.println("Total area: " + areaCalculator.getTotalArea());

        // 计算周长
        PerimeterCalculator perimeterCalculator = new PerimeterCalculator();
        for (Shape shape : shapes) {
            shape.accept(perimeterCalculator);
        }
        System.out.println("Total perimeter: " + perimeterCalculator.getTotalPerimeter());
    }
}
```

这样，就利用访问者模式实现了对几何图形的面积和周长的计算，而不需要修改几何图形类的代码。

# 常见面试题

1.  **简要解释访问者模式：**
- 问题：面试官希望了解面试者对访问者模式的基本理解。
- 面试官的目的：评估面试者对访问者模式的了解程度。
- 预期回答：面试者应该能够简洁地解释访问者模式是一种行为设计模式，用于在不改变对象结构的情况下定义新的操作，并且能够提及其关注点分离的特性和实际应用场景。
- 答案：访问者模式是一种行为设计模式，它允许你在不改变已有类的情况下定义一组新的操作。通过将操作从对象结构中分离出来，访问者模式实现了关注点的分离，使得可以在不改变对象结构的前提下定义新的操作。
2.  **项目经历中是否使用过访问者模式：**
- 问题：面试官想了解面试者是否有实际应用访问者模式的经验。
- 面试官的目的：评估面试者的实际经验和能力。
- 预期回答：面试者应该能够分享具体的应用案例，并强调访问者模式的优势和实际效果。如果没有使用过，面试者应该说明自己对访问者模式的理解，并说明在哪些场景下可以考虑使用。
- 答案：我曾在一个项目中使用过访问者模式。我们有一个复杂的数据结构，需要支持多种不同的操作，包括数据分析、报告生成等。我们使用访问者模式来实现对数据结构的不同操作，通过定义不同的访问者来实现不同的功能，而不需要修改数据结构本身的代码。
3.  **访问者模式与其他设计模式的区别和适用场景：**
- 问题：面试官希望了解面试者对访问者模式与其他设计模式的比较和应用场景的理解。
- 面试官的目的：评估面试者的全面理解和分析能力。
- 预期回答：面试者应该能够比较访问者模式与其他相关的设计模式，指出它们的不同之处和适用场景，并且能够强调访问者模式适用于处理复杂对象结构和支持多种不同操作的场景。
- 答案：访问者模式与其他设计模式的主要区别在于它将操作从对象结构中分离出来，实现了关注点的分离。它适用于处理复杂的对象结构，特别是当对象结构的类层次比较稳定而其操作的变化比较频繁时。
4.  **访问者模式的优缺点及适用情况：**
- 问题：面试官希望了解面试者对访问者模式的优缺点和适用情况的理解。
- 面试官的目的：评估面试者对访问者模式的综合认识和评估能力。
- 预期回答：面试者应该能够列举访问者模式的优点和缺点，并结合具体情况说明在什么样的场景下使用访问者模式比较合适，例如增加新元素类的困难和破坏封装等。
- 答案：访问者模式的优点包括关注点分离、灵活性和可扩展性，可以在不改变对象结构的情况下定义新的操作。缺点包括增加新元素类的困难和破坏封装。它适用于处理复杂对象结构和支持多种不同操作的场景。
5.  **处理新元素类的添加：**
- 问题：面试官希望了解面试者在实现访问者模式时如何处理新元素类的添加。
- 面试官的目的：评估面试者的设计和扩展能力。
- 预期回答：面试者应该能够说明如何设计接口以支持新元素类的添加，并强调设计的灵活性和扩展性，以应对新元素类的添加。
- 答案：在实现访问者模式时，我会设计接口以支持新元素类的添加，通过定义抽象的元素接口和具体的元素类来支持多态处理。我会确保设计的灵活性和扩展性，以应对新元素类的添加。
