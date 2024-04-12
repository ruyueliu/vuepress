---
title: 设计模式（10）｜建造者模式（Builder Pattern）
date: 2024-04-12
---
@[toc]
建造者模式（Builder Pattern）是一种创建型设计模式，用于将一个复杂对象的构建过程与其表示分离，以便可以使用相同的构建过程创建不同的表示。
# 结构

- **Builder（建造者）接口或抽象类**： 定义了构建对象的各个步骤的方法。
- **ConcreteBuilder（具体建造者）类**： 实现了 Builder 接口或继承 Builder 抽象类，负责实际构建对象的各个部分。
- **Director（指挥者）类**： 负责协调建造者的步骤，指导构建过程，最终创建对象。
- **Product（产品）类**： 构建的最终对象，通常由具体建造者构建完成。
# 优点

- **分离构建过程和表示**：使得相同的构建过程可以创建不同的表示，提高了灵活性。
- **简化对象构建**：通过指挥者协调建造者的步骤，客户端代码可以简化对象的构建过程，只需关注指挥者而不是具体的构建细节。
- **更好的组织代码**：将对象的构建过程组织在建造者中，使得代码更具可读性和可维护性。
# 缺点

- **增加了类的数量**：引入了 Builder、ConcreteBuilder 和 Director 类，增加了代码量和类的数量。
- **可能会导致过多的建造者类**：如果产品的变体很多，可能需要创建多个具体建造者类，使得代码复杂度增加。
# 适用场景
建造者模式适用于以下场景：

1.  **创建复杂对象**：当对象的构建过程非常复杂，包含多个步骤或者具有复杂的配置选项时，可以使用建造者模式将构建过程和表示分离。
2.  **需要创建多种表示**：当需要使用相同的构建过程创建不同表示的对象时，可以使用建造者模式。例如，创建不同类型的产品，但它们都共享相同的构建过程。
3.  **对象构建顺序变化**：当对象的构建顺序可能变化，或者需要以不同的方式构建对象时，可以使用建造者模式。通过使用指挥者来协调建造者的步骤，可以根据需要动态改变构建顺序。
4.  **避免 Telescoping 构造器模式**：当使用多个构造器参数时，Telescoping 构造器模式（一种反模式）会导致构造器参数列表变得非常长。建造者模式可以解决这个问题，使得客户端代码更加清晰。
5.  **对构造过程进行抽象**：当希望将对象的构建过程与其表示解耦，以便于更好地组织代码、提高可读性和可维护性时，可以使用建造者模式。

总的来说，建造者模式适用于需要创建复杂对象、对象的构建过程复杂或者对象的表示需要分离的情况。通过建造者模式，可以更好地组织代码，提高代码的灵活性和可维护性。
# 示例
通过一个简单的示例来演示如何在 Java 中实现建造者模式：创建一个简单的电脑类（Computer），其构建过程包括设置 CPU、内存、硬盘和操作系统。然后，使用建造者模式来构建不同配置的电脑对象。

```java
// 产品类：Computer
class Computer {
    private String cpu;
    private String memory;
    private String hardDisk;
    private String os;

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }

    public void setHardDisk(String hardDisk) {
        this.hardDisk = hardDisk;
    }

    public void setOs(String os) {
        this.os = os;
    }

    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", memory='" + memory + '\'' +
                ", hardDisk='" + hardDisk + '\'' +
                ", os='" + os + '\'' +
                '}';
    }
}

// 抽象建造者类：ComputerBuilder
interface ComputerBuilder {
    void setCpu();
    void setMemory();
    void setHardDisk();
    void setOs();
    Computer build();
}

// 具体建造者类：HighEndComputerBuilder
class HighEndComputerBuilder implements ComputerBuilder {
    private Computer computer;

    public HighEndComputerBuilder() {
        this.computer = new Computer();
    }

    @Override
    public void setCpu() {
        computer.setCpu("Intel i9");
    }

    @Override
    public void setMemory() {
        computer.setMemory("32GB DDR4");
    }

    @Override
    public void setHardDisk() {
        computer.setHardDisk("1TB SSD");
    }

    @Override
    public void setOs() {
        computer.setOs("Windows 10 Pro");
    }

    @Override
    public Computer build() {
        return computer;
    }
}

// 指挥者类：ComputerDirector
class ComputerDirector {
    public Computer construct(ComputerBuilder builder) {
        builder.setCpu();
        builder.setMemory();
        builder.setHardDisk();
        builder.setOs();
        return builder.build();
    }
}

// 客户端代码
public class BuilderPatternExample {
    public static void main(String[] args) {
        ComputerDirector director = new ComputerDirector();

        // 构建高配版电脑
        ComputerBuilder highEndBuilder = new HighEndComputerBuilder();
        Computer highEndComputer = director.construct(highEndBuilder);
        System.out.println("高配版电脑配置：" + highEndComputer);

        // 这里可以创建其他具体建造者对象，构建不同配置的电脑
    }
}
```

在这个示例中，首先定义了产品类 `Computer`，然后定义了抽象建造者接口 `ComputerBuilder`，以及具体建造者类 `HighEndComputerBuilder`。最后，定义了指挥者类 `ComputerDirector` 来协调建造者的步骤。

通过运行客户端代码，可以构建不同配置的电脑对象，而不必直接关注建造过程的细节。

