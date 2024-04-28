---
title: Redis学习（四）｜深入学习Redis的高级数据结构
date: 2024-04-28
---
<!-- TOC -->
  * [HyperLogLog（基数统计）](#hyperloglog基数统计)
    * [原理](#原理)
    * [用法](#用法)
    * [应用场景](#应用场景)
    * [HyperLogLog vs HashMap](#hyperloglog-vs-hashmap)
        * [HyperLogLog](#hyperloglog)
        * [HashMap](#hashmap)
        * [对比总结](#对比总结)
    * [BoundHyperLogLogOperations](#boundhyperloglogoperations)
  * [Bitmaps（位图）](#bitmaps位图)
    * [原理](#原理-1)
    * [用法](#用法-1)
    * [应用场景](#应用场景-1)
    * [BoundBitSetOperations](#boundbitsetoperations)
  * [GEO（地理位置）](#geo地理位置)
    * [原理](#原理-2)
    * [用法](#用法-2)
    * [应用场景](#应用场景-2)
    * [GeoOperations](#geooperations)
    
<!-- TOC -->
Redis作为一种高性能的键值存储系统，除了基本的数据结构（字符串、列表、集合、哈希、有序集合）外，还提供了一系列高级数据结构，本文将深入介绍这些高级数据结构的原理、用法以及应用场景，帮助更全面地了解和应用Redis。
## HyperLogLog（基数统计）
### 原理
HyperLogLog是一种用于近似基数统计的算法，通过使用固定大小的内存空间，可以估计一个集合中不重复元素的数量。
具体来说，HyperLogLog 是一种基数估算算法。所谓基数估算，就是估算在一批数据中，不重复元素的个数有多少。最常见的场景就是统计uv。HyperLogLog实际上不会存储每个元素的值，它使用的是概率算法，通过存储元素的 hash 值的第一个1的位置，来计算元素数量。这样做存在误差，不适合绝对准确计数的场景。Redis中实现的HyperLogLog，只需要12K内存，在标准误差0.81%的前提下，能够统计2的64次方个数据。
### 用法

- PFADD：向HyperLogLog数据结构中添加元素。
- PFCOUNT：获取HyperLogLog数据结构中不重复元素的数量。
### 应用场景

- 统计网站UV（Unique Visitors）数量。
- 计算社交网络中不同用户的访问数量。
- 统计广告点击量。
### HyperLogLog vs HashMap
HyperLogLog 和 HashMap 是可以用于数据统计的两种不同的数据结构，它们各有优缺点，适用于不同的场景。
##### HyperLogLog
**优点：**

1. **内存消耗低：** HyperLogLog 采用了一种近似算法，可以用固定大小的内存空间来估计一个集合中不重复元素的数量，因此内存消耗较低。
2. **性能高：** HyperLogLog 在处理大规模数据时，具有较高的性能，基数估计的计算复杂度为 O(1)。
3. **适用于大数据场景：** 当数据量非常大时，使用 HyperLogLog 可以在较小的内存消耗下进行基数估计，适用于大数据场景。

**缺点：**

1. **精度有限：** HyperLogLog 是一种近似算法，其基数估计的结果是一个近似值，存在一定的误差，因此精度有限。
2. **无法存储具体元素：** HyperLogLog 只能用于统计集合中不重复元素的数量，无法存储具体的元素信息，也无法用于统计重复元素的数量。
##### HashMap
**优点：**

1. **精确统计：** HashMap 可以精确地统计集合中每个元素的出现次数，不会产生误差。
2. **灵活性高：** HashMap 可以存储具体的元素信息，可以用于统计任意数据的出现次数。
3. **数据查询方便：** HashMap 可以根据具体的元素进行查询，方便获取具体元素的统计信息。

**缺点：**

1. **内存消耗高：** HashMap 需要根据具体元素来存储每个元素的出现次数，因此在数据量大时，会消耗大量的内存空间。
2. **性能相对较低：** 在处理大规模数据时，HashMap 的性能可能会受到影响，因为需要存储和处理大量的元素信息。
##### 对比总结

- 当需要在较小的内存消耗下对大规模数据进行基数估计时，可以选择使用 HyperLogLog。
- 当需要精确统计每个元素的出现次数，或者需要存储具体元素信息时，可以选择使用 HashMap。
- 在实际应用中，根据数据规模、精度要求以及内存限制等因素来选择合适的数据结构进行数据统计。
### BoundHyperLogLogOperations
如果想使用Spring Data Redis 中的 RedisTemplate 来操作 HyperLogLog，可以通过 RedisTemplate 提供的方法来实现。以下是一个简单的示例代码：
```java
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.BoundHyperLogLogOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

public class HyperLogLogExample {
    private final RedisTemplate<String, String> redisTemplate;

    public HyperLogLogExample(RedisConnectionFactory connectionFactory) {
        this.redisTemplate = new RedisTemplate<>();
        this.redisTemplate.setConnectionFactory(connectionFactory);
        this.redisTemplate.setKeySerializer(new StringRedisSerializer());
        this.redisTemplate.setValueSerializer(new StringRedisSerializer());
        this.redisTemplate.afterPropertiesSet();
    }

    public void addElementsToHyperLogLog(String key, int count) {
        BoundHyperLogLogOperations<String, String> hyperLogLog = redisTemplate.boundHyperLogLog(key);
        for (int i = 0; i < count; i++) {
            hyperLogLog.add("element" + i);
        }
    }

    public long getEstimatedCardinality(String key) {
        BoundHyperLogLogOperations<String, String> hyperLogLog = redisTemplate.boundHyperLogLog(key);
        return hyperLogLog.size();
    }

    public static void main(String[] args) {
        // 假设已经有一个 RedisConnectionFactory 实例 connectionFactory

        HyperLogLogExample example = new HyperLogLogExample(connectionFactory);

        // 添加元素到 HyperLogLog
        example.addElementsToHyperLogLog("hyperloglog_test", 10000);

        // 获取 HyperLogLog 的基数估计值
        long count = example.getEstimatedCardinality("hyperloglog_test");
        System.out.println("Estimated cardinality: " + count);
    }
}
```

在这个示例中，首先创建了一个 RedisTemplate 实例，并设置了连接工厂以及 key 和 value 的序列化器。然后，定义了 `addElementsToHyperLogLog` 方法来向 HyperLogLog 中添加元素，并通过 `getEstimatedCardinality` 方法获取了 HyperLogLog 的基数估计值。
需要注意的是，通过 RedisTemplate 操作 HyperLogLog 时，需要使用 `boundHyperLogLog` 方法获取一个绑定了特定 key 的 HyperLogLogOperations 实例，然后通过该实例来进行操作。
## Bitmaps（位图）
### 原理
Bitmaps（位图）是一种紧凑的数据结构，用于存储大量的布尔值，并支持高效的位操作。在 Redis 中，位图通常以字符串的形式存储，每个位都可以被设置为 0 或 1，表示某个事件是否发生或某个状态是否有效。
### 用法

- SETBIT：设置位图中指定位置的值。
- GETBIT：获取位图中指定位置的值。
- BITCOUNT：统计位图中值为1的位数。
### 应用场景

- 在线状态标记： 可以用位图来标记用户的在线状态，每个位代表一个用户，状态为 1 表示在线，状态为 0 表示离线。
- 活跃用户统计： 可以用位图来统计某个时间段内活跃的用户数量，每个位代表一个用户，状态为 1 表示用户在该时间段内有活动，状态为 0 表示用户没有活动。
- 布隆过滤器（Bloom Filter）： 可以用位图来实现布隆过滤器，用于快速判断某个元素是否存在于一个集合中，适用于大规模数据去重或快速查询场景。
### BoundBitSetOperations
在 Java 中使用 RedisTemplate 操作位图（Bitmaps），可以通过 RedisTemplate 提供的方法来实现。以下是一个简单的示例代码：
```java
import org.springframework.data.redis.core.BoundBitSetOperations;
import org.springframework.data.redis.core.RedisTemplate;

public class BitmapExample {
    private final RedisTemplate<String, Object> redisTemplate;

    public BitmapExample(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setBit(String key, long offset, boolean value) {
        BoundBitSetOperations<String> bitSetOps = redisTemplate.boundBitSet(key);
        bitSetOps.set(offset, value);
    }

    public boolean getBit(String key, long offset) {
        BoundBitSetOperations<String> bitSetOps = redisTemplate.boundBitSet(key);
        return bitSetOps.get(offset);
    }

    public long bitCount(String key) {
        BoundBitSetOperations<String> bitSetOps = redisTemplate.boundBitSet(key);
        return bitSetOps.size();
    }

    public static void main(String[] args) {
        // 假设已经有一个 RedisTemplate<String, Object> 实例 redisTemplate

        BitmapExample example = new BitmapExample(redisTemplate);

        // 设置位图中指定位置的值
        example.setBit("bitmap_test", 0, true);
        example.setBit("bitmap_test", 2, true);
        example.setBit("bitmap_test", 4, true);

        // 获取位图中指定位置的值
        System.out.println("Bit at position 0: " + example.getBit("bitmap_test", 0));
        System.out.println("Bit at position 1: " + example.getBit("bitmap_test", 1));
        System.out.println("Bit at position 2: " + example.getBit("bitmap_test", 2));
        System.out.println("Bit at position 3: " + example.getBit("bitmap_test", 3));
        System.out.println("Bit at position 4: " + example.getBit("bitmap_test", 4));

        // 统计位图中值为 1 的位数
        System.out.println("Bit count: " + example.bitCount("bitmap_test"));
    }
}
```

在这个示例中，首先创建了一个 RedisTemplate 实例，并通过 `boundBitSet` 方法获取了一个绑定了指定 key 的 BoundBitSetOperations 实例，然后可以通过这个实例来进行位图操作。具体来说，定义了 `setBit` 方法用于设置位图中指定位置的值，`getBit` 方法用于获取位图中指定位置的值，以及 `bitCount` 方法用于统计位图中值为 1 的位数。
通过 RedisTemplate 操作位图时，需要使用 `boundBitSet` 方法获取一个 BoundBitSetOperations 实例，并通过该实例来进行操作。
## GEO（地理位置）
### 原理
Redis中的GEO（地理位置）是一种用于存储地理位置信息的数据结构和相关命令。它可以存储地理位置的经度和纬度，并支持对位置信息进行附近点搜索、距离计算等操作。在Redis中，GEO是通过有序集合（Sorted Set）来实现的，每个成员都是一个地理位置，而分数则是该位置的经纬度。
### 用法

- GEOADD：向GEO数据结构中添加地理位置。
- GEODIST：计算两点之间的距离。
- GEORADIUS：根据给定的坐标和半径查找附近的位置。
### 应用场景

- 附近点搜索：可以根据给定的地理位置坐标，搜索附近的其他地理位置，用于实现附近的人、附近的店铺等功能。
- 位置标记：可以将地理位置信息存储在GEO中，用于标记用户的实时位置、商家的店铺位置等。
- 地理围栏：可以使用GEO实现地理围栏功能，对某个区域内的位置进行监控和提醒。
- 路径规划：可以根据地理位置信息，计算两个位置之间的距离，用于实现路径规划和导航功能。
### GeoOperations 
在 RedisTemplate 中使用 GEO（地理位置）功能，可以通过 RedisTemplate 提供的 `opsForGeo()` 方法获取一个 GeoOperations 实例，然后使用该实例来进行 GEO 相关操作。以下是一个示例代码：
```java
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metric;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;

public class GeoExample {
    private final RedisTemplate<String, Object> redisTemplate;

    public GeoExample(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void addLocation(String key, double longitude, double latitude, String member) {
        redisTemplate.opsForGeo().add(key, new Point(longitude, latitude), member);
    }

    public Double calculateDistance(String key, String member1, String member2) {
        Distance distance = redisTemplate.opsForGeo().distance(key, member1, member2, RedisGeoCommands.DistanceUnit.KILOMETERS);
        return distance != null ? distance.getValue() : null;
    }

    public List<RedisGeoCommands.GeoLocation<Object>> findNearbyMembers(String key, double longitude, double latitude, double distance, RedisGeoCommands.DistanceUnit unit) {
        Point point = new Point(longitude, latitude);
        Distance geoDistance = new Distance(distance, unit);
        RedisGeoCommands.GeoRadiusCommandArgs args = RedisGeoCommands.GeoRadiusCommandArgs.newGeoRadiusArgs().includeCoordinates();
        return redisTemplate.opsForGeo().radius(key, point, geoDistance, args);
    }

    public static void main(String[] args) {
        // 假设已经有一个 RedisTemplate<String, Object> 实例 redisTemplate

        GeoExample example = new GeoExample(redisTemplate);

        // 添加地理位置成员
        example.addLocation("locations", 116.405285, 39.904989, "Beijing");
        example.addLocation("locations", 121.473701, 31.230416, "Shanghai");

        // 计算两个地理位置之间的距离
        Double distance = example.calculateDistance("locations", "Beijing", "Shanghai");
        System.out.println("Distance between Beijing and Shanghai: " + distance + " km");

        // 搜索指定地理位置附近的成员
        List<RedisGeoCommands.GeoLocation<Object>> nearbyMembers = example.findNearbyMembers("locations", 116.405285, 39.904989, 500, RedisGeoCommands.DistanceUnit.KILOMETERS);
        System.out.println("Nearby members:");
        for (RedisGeoCommands.GeoLocation<Object> member : nearbyMembers) {
            System.out.println(member.getName() + ", Coordinates: " + member.getPoint());
        }
    }
}
```

在这个示例中，首先通过 `opsForGeo()` 方法获取了一个 GeoOperations 实例，然后通过该实例来进行 GEO 相关操作。具体包括：

- 使用 `add()` 方法向指定的 GEO 集合中添加地理位置成员。
- 使用 `distance()` 方法计算两个地理位置成员之间的距离。
- 使用 `radius()` 方法搜索指定地理位置附近的成员。

在调用这些方法时，需要注意传入的参数类型和具体操作的参数选项，以及处理返回结果的方式。

