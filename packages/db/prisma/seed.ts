import prisma from "../src/index";

async function main() {
  await prisma.review.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.allOrders.deleteMany({});
  await prisma.query.deleteMany({});

  const oilCategory = await prisma.category.create({
    data: {
      name: "Oil",
      posterImage:
        "https://d3rts3x4c8sg1r.cloudfront.net/Category_Images/OilCategoryPoster.png",
      products: {
        create: [
          {
            title: "Cold Pressed Groundnut Oil",
            latestPrice: "419",
            oldPrice: "475",
            shortDescription:
              "Cold Pressed Groundnut Oil is a pure and natural oil extracted using traditional wooden press methods. This process retains the oil's rich, nutty flavor and preserves essential nutrients, making it an ideal choice for health-conscious consumers. High in antioxidants and monounsaturated fats, our groundnut oil enhances the taste of your dishes while promoting heart health and overall well-being.",
            longDescription:
              "Cold Pressed Groundnut Oil is a pure and natural oil extracted using traditional wooden press methods. This artisanal process ensures that no heat or chemicals are used, preserving the oil's rich, nutty flavor and retaining essential nutrients that are often lost in conventional extraction methods. The result is a high-quality oil that is perfect for health-conscious consumers who value both taste and nutrition in their culinary choices. Rich in antioxidants and monounsaturated fats, our Cold Pressed Groundnut Oil offers numerous health benefits. It contains essential vitamins, including Vitamin E, which supports healthy skin and boosts immunity. The high content of monounsaturated fats helps to reduce bad cholesterol levels, thereby promoting cardiovascular health and overall well-being. These properties make it an excellent choice for those looking to maintain a healthy heart and balanced diet. This versatile oil is perfect for a variety of cooking methods, including frying, sautéing, and even as a dressing for salads. Its unique, nutty flavor enhances the taste of your dishes, from stir-fries to baked goods, providing a delicious and wholesome addition to your kitchen. Additionally, our Cold Pressed Groundnut Oil is completely free from additives, preservatives, and artificial flavors, ensuring a wholesome and natural product that you can trust. Beyond its culinary uses, Cold Pressed Groundnut Oil is also valued for its moisturizing properties, making it a beneficial addition to natural skincare and hair care routines. Its nutrient-rich composition supports healthy, glowing skin and nourished hair. Experience the natural goodness and rich flavor of our Cold Pressed Groundnut Oil. Whether you are using it to elevate your culinary creations or incorporating it into your skincare regimen, you can enjoy the multiple benefits of this exceptional oil, knowing that it supports both your health and well-being in the most natural way possible.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPO_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPO_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPO_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPO_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPO_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Jane",
                  lastName: "Smith",
                  reviewTitle: "Amazing Flavor",
                  reviewDescription:
                    "This groundnut oil has an incredible nutty taste that enhances all my dishes.",
                  reviewStars: 5,
                },

                {
                  firstName: "Alex",
                  lastName: "Johnson",
                  reviewTitle: "Highly Recommended",
                  reviewDescription:
                    "The quality of this oil is top-notch, and I love that it's all natural.",
                  reviewStars: 4,
                },
                {
                  firstName: "Emily",
                  lastName: "Davis",
                  reviewTitle: "Perfect for Cooking",
                  reviewDescription:
                    "I've been using this oil for frying and sautéing, and it works perfectly every time.",
                  reviewStars: 5,
                },
                {
                  firstName: "Michael",
                  lastName: "Brown",
                  reviewTitle: "Great Health Benefits",
                  reviewDescription:
                    "Not only does this oil taste great, but it's also good for my heart health.",
                  reviewStars: 3,
                },
                {
                  firstName: "Sarah",
                  lastName: "Wilson",
                  reviewTitle: "Versatile and Delicious",
                  reviewDescription:
                    "I've used this oil in a variety of recipes, and it never disappoints.",
                  reviewStars: 3,
                },
              ],
            },
          },
          {
            title: "Cold Pressed Coconut Oil",
            latestPrice: "469",
            oldPrice: "550",
            shortDescription:
              "Cold Pressed Coconut Oil is a natural, unrefined oil extracted from fresh coconuts using a cold pressing technique that preserves its nutrients and rich coconut flavor. This versatile oil is ideal for cooking, baking, skincare, and hair care, offering a range of health benefits due to its high content of medium-chain fatty acids and antioxidants.",
            longDescription:
              "Cold Pressed Coconut Oil is a premium, high-quality oil extracted from fresh coconuts using a cold pressing method that preserves the natural goodness and nutrients of the coconut. This process ensures that the oil retains its rich, natural aroma, and flavor, making it ideal for both culinary and cosmetic uses. Unlike traditional extraction methods that use heat, cold pressing maintains the oil's nutritional profile, including its high content of medium-chain triglycerides (MCTs), which are known for their health benefits. In the kitchen, Cold Pressed Coconut Oil can be used as a healthy alternative to butter or other cooking oils. Its subtle coconut flavor enhances a variety of dishes, from baked goods to stir-fries, and it is particularly well-suited for high-heat cooking due to its stable nature. Beyond its culinary applications, Cold Pressed Coconut Oil is a versatile addition to any beauty regimen. It is an excellent natural moisturizer for the skin and hair, providing deep hydration without clogging pores. It can also be used as a gentle makeup remover, a soothing treatment for dry or irritated skin, and an enriching ingredient in homemade beauty products. Sustainably sourced and free from additives and preservatives, Cold Pressed Coconut Oil is a natural and eco-friendly choice. Its multifaceted uses and healthful properties make it an essential product for those seeking to enhance their well-being and embrace a more natural lifestyle.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPC_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPC_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPC_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPC_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPC_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "John",
                  lastName: "Sena",
                  reviewTitle: "Great product quality!",
                  reviewDescription:
                    "I love the taste and quality of this olive oil. ok",
                  reviewStars: 1,
                },

                {
                  firstName: "Lisa",
                  lastName: "Ray",
                  reviewTitle: "Exceptional Taste",
                  reviewDescription:
                    "The groundnut oil has a rich, nutty flavor that really enhances my dishes. Highly recommend!",
                  reviewStars: 5,
                },

                {
                  firstName: "David",
                  lastName: "Lee",
                  reviewTitle: "Good but Pricey",
                  reviewDescription:
                    "The oil is excellent in quality but a bit on the expensive side.",
                  reviewStars: 4,
                },

                {
                  firstName: "Sophia",
                  lastName: "Martinez",
                  reviewTitle: "Disappointed",
                  reviewDescription:
                    "Didn't like the taste. It wasn't as fresh as I expected.",
                  reviewStars: 2,
                },

                {
                  firstName: "Mark",
                  lastName: "Robinson",
                  reviewTitle: "Great for Cooking",
                  reviewDescription:
                    "This oil is perfect for frying and adds a nice flavor to my meals.",
                  reviewStars: 5,
                },
                {
                  firstName: "Emma",
                  lastName: "Clark",
                  reviewTitle: "Average Quality",
                  reviewDescription:
                    "The quality is okay but not the best I've had.",
                  reviewStars: 3,
                },
                {
                  firstName: "James",
                  lastName: "Anderson",
                  reviewTitle: "Excellent Purchase",
                  reviewDescription:
                    "Very happy with this purchase. The oil is of high quality and tastes great.",
                  reviewStars: 5,
                },
                {
                  firstName: "Olivia",
                  lastName: "Garcia",
                  reviewTitle: "Not Worth the Hype",
                  reviewDescription:
                    "I found it to be too greasy and not as flavorful as expected.",
                  reviewStars: 2,
                },
              ],
            },
          },
          {
            title: "Sesame Oil",
            latestPrice: "800",
            oldPrice: "1200",
            shortDescription:
              "Sesame Oil is a premium oil extracted from raw sesame seeds through a gentle cold pressing method, ensuring the preservation of its natural nutrients and rich flavor. Known for its distinctive nutty taste, this oil is widely used in cooking, particularly in Asian cuisines, and offers numerous health benefits, including antioxidant properties and heart-healthy fats. Additionally, it can be used in skincare and haircare for its moisturizing and nourishing qualities.",
            longDescription:
              "Sesame Oil is a highly valued oil known for its rich flavor and numerous health benefits, derived from premium sesame seeds through a careful cold pressing process. This method involves extracting the oil without the application of heat, which preserves the oil's natural nutrients, antioxidants, and unique flavor profile. The result is a fragrant, golden oil that enhances culinary creations while providing a wealth of nutritional advantages. In cooking, Cold Pressed Sesame Oil is celebrated for its versatility. It adds a nutty aroma to dishes and is ideal for stir-frying, sautéing, and drizzling over salads or roasted vegetables. Its high smoke point makes it suitable for various cooking methods, ensuring that the oil retains its integrity and flavor even at elevated temperatures. Beyond its culinary uses, this oil is also packed with essential fatty acids, vitamins, and minerals, making it a valuable addition to a balanced diet. Moreover, Cold Pressed Sesame Oil is renowned for its skincare benefits. It serves as an excellent moisturizer, helping to nourish and hydrate the skin while providing protection against environmental damage. Its natural antioxidants contribute to healthier, more radiant skin and can also aid in soothing dry or irritated areas. Additionally, it is often used in massage therapies due to its smooth texture and nourishing properties, promoting relaxation and skin vitality. Sustainably sourced and free from artificial additives, Cold Pressed Sesame Oil embodies a commitment to quality and natural wellness. Its delightful flavor, coupled with its myriad health benefits, makes it an essential staple for anyone looking to enhance their cooking and elevate their self-care routines.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPS_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPS_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPS_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPS_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPS_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Rachel",
                  lastName: "Adams",
                  reviewTitle: "Nutty and Delicious",
                  reviewDescription:
                    "This oil has a fantastic nutty flavor that elevates my cooking.",
                  reviewStars: 5,
                },

                {
                  firstName: "Chris",
                  lastName: "Johnson",
                  reviewTitle: "Too Strong for My Taste",
                  reviewDescription:
                    "I found the flavor to be a bit overpowering for my dishes.",
                  reviewStars: 2,
                },

                {
                  firstName: "Maya",
                  lastName: "Thompson",
                  reviewTitle: "Good Quality Oil",
                  reviewDescription:
                    "The oil is good, but I expected a more robust taste.",
                  reviewStars: 4,
                },
              ],
            },
          },
          {
            title: "Mustard Oil",
            latestPrice: "999",
            oldPrice: "1999",
            shortDescription:
              "Mustard Oil is a pungent, flavorful oil extracted from mustard seeds, known for its distinctive taste and aroma. Rich in healthy fats and omega-3 fatty acids, it is commonly used in cooking, especially in Indian and Bangladeshi cuisines, where it enhances the flavor of dishes. Beyond culinary uses, mustard oil is also valued for its potential health benefits, including anti-inflammatory properties, and is often used in traditional remedies and skincare for its nourishing qualities.",
            longDescription:
              "Mustard oil is a distinctive and flavorful oil extracted from mustard seeds, celebrated for its robust taste and numerous health benefits. The extraction process often involves cold pressing, which retains the oil's natural properties and ensures a high-quality product. Mustard oil is characterized by its pungent aroma and vibrant yellow hue, making it a staple in various culinary traditions, especially in Indian and Bengali cuisine. In the kitchen, mustard oil is prized for its versatility. It adds a unique depth of flavor to dishes, making it ideal for frying, sautéing, and as a base for salad dressings. Its high smoke point allows for high-heat cooking without compromising its integrity, making it suitable for a wide range of culinary applications. Additionally, mustard oil is known for its ability to enhance the taste of vegetables, meats, and fish, providing a distinctive tang that elevates any dish. Beyond its culinary uses, mustard oil is also recognized for its health benefits. It is rich in monounsaturated and polyunsaturated fats, which are essential for heart health. The oil contains omega-3 and omega-6 fatty acids, known for their anti-inflammatory properties, as well as antioxidants that help combat oxidative stress. Additionally, mustard oil is often used in traditional remedies for its warming qualities and potential digestive benefits. In personal care, mustard oil serves as an effective natural moisturizer. Its nourishing properties make it a popular choice for hair and skin care, helping to promote healthy hair growth and providing hydration to dry skin. Its antimicrobial properties also make it useful for treating minor skin irritations and promoting overall skin health. Sustainably sourced and free from artificial additives, mustard oil stands out as a natural and healthful choice for those seeking to enhance their cooking and self-care practices. Its bold flavor and array of health benefits make it an essential ingredient in any kitchen and a valuable addition to personal wellness routines.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPM_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPM_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPM_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPM_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/CPM_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Rachel",
                  lastName: "Adams",
                  reviewTitle: "Nutty and Delicious",
                  reviewDescription:
                    "This oil has a fantastic nutty flavor that elevates my cooking.",
                  reviewStars: 5,
                },

                {
                  firstName: "Chris",
                  lastName: "Johnson",
                  reviewTitle: "Too Strong for My Taste",
                  reviewDescription:
                    "I found the flavor to be a bit overpowering for my dishes.",
                  reviewStars: 2,
                },

                {
                  firstName: "Maya",
                  lastName: "Thompson",
                  reviewTitle: "Good Quality Oil",
                  reviewDescription:
                    "The oil is good, but I expected a more robust taste.",
                  reviewStars: 4,
                },

                {
                  firstName: "Kevin",
                  lastName: "Smith",
                  reviewTitle: "Great for Stir-Frying",
                  reviewDescription:
                    "This oil works perfectly for stir-frying and adds a nice touch.",
                  reviewStars: 5,
                },

                {
                  firstName: "Linda",
                  lastName: "Brown",
                  reviewTitle: "Not What I Expected",
                  reviewDescription:
                    "The oil was fine, but it didn't meet my expectations for quality.",
                  reviewStars: 3,
                },

                {
                  firstName: "Tom",
                  lastName: "Davis",
                  reviewTitle: "Best Oil I've Tried",
                  reviewDescription:
                    "I absolutely love this oil! It’s rich and flavorful.",
                  reviewStars: 5,
                },

                {
                  firstName: "Sarah",
                  lastName: "Wilson",
                  reviewTitle: "Decent, But Overpriced",
                  reviewDescription:
                    "The quality is decent, but I think it's a bit overpriced for what it is.",
                  reviewStars: 3,
                },

                {
                  firstName: "Brian",
                  lastName: "Garcia",
                  reviewTitle: "Perfect for Everyday Cooking",
                  reviewDescription:
                    "I use this oil daily. It's versatile and tastes great!",
                  reviewStars: 4,
                },

                {
                  firstName: "Emma",
                  lastName: "Martinez",
                  reviewTitle: "Too Greasy",
                  reviewDescription:
                    "I found it to be greasier than other oils I’ve used.",
                  reviewStars: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const honeyCategory = await prisma.category.create({
    data: {
      name: "Honey",
      posterImage:
        "https://d3rts3x4c8sg1r.cloudfront.net/Category_Images/HoneyCategoryPoster.jpeg",
      products: {
        create: [
          {
            title: "Raw Wildflower Honey",
            latestPrice: "449",
            shortDescription:
              "Raw Wildflower Honey is a pure, unprocessed honey sourced from the nectar of various wildflowers, reflecting the diverse flora of its region. This naturally sweet, golden liquid is rich in antioxidants, vitamins, and minerals, making it a healthy addition to your diet. Known for its unique flavor profile that varies with the season and location, raw wildflower honey is ideal for sweetening beverages, drizzling over foods, or using in baking, while also offering potential health benefits such as soothing sore throats and boosting immunity.",
            longDescription:
              "Raw Wildflower Honey is a natural, unprocessed sweetener harvested from the nectar of wildflowers by bees. This honey stands out for its diverse flavor profile, which varies depending on the specific blossoms visited by the bees. Characterized by its rich aroma and vibrant color, Raw Wildflower Honey captures the essence of its floral sources, making it a delightful addition to a variety of culinary and wellness applications. In the kitchen, Raw Wildflower Honey is a versatile ingredient that can be used to enhance the flavor of teas, baked goods, and dressings. Its unique taste complements both sweet and savory dishes, making it a popular choice for drizzling over yogurt, pancakes, or oatmeal. Unlike refined sugars, Raw Wildflower Honey not only adds sweetness but also brings with it a host of beneficial enzymes, vitamins, and minerals. Beyond its culinary uses, Raw Wildflower Honey is celebrated for its numerous health benefits. Rich in antioxidants, it helps combat oxidative stress and supports overall health. Many people turn to this honey for its potential soothing properties, particularly for sore throats or coughs. Additionally, Raw Wildflower Honey is known to possess natural antibacterial and anti-inflammatory properties, making it a popular remedy for minor wounds and skin irritations. Furthermore, Raw Wildflower Honey is often sought after for its potential role in supporting local ecosystems and promoting sustainable beekeeping practices. Sourced from diverse floral sources, it not only benefits those who consume it but also plays a crucial role in pollination and maintaining biodiversity. With its unparalleled flavor and myriad health benefits, Raw Wildflower Honey is more than just a sweetener; it is a natural treasure that embodies the harmony of nature. Whether used in cooking, as a home remedy, or enjoyed on its own, this honey is a wholesome choice for anyone looking to embrace a healthier lifestyle.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/RWH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/RWH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/RWH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/RWH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/RWH_1.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Anna",
                  lastName: "Scott",
                  reviewTitle: "Delicious and Pure",
                  reviewDescription:
                    "This honey has a rich flavor and is perfect for my tea. Love it!",
                  reviewStars: 5,
                },

                {
                  firstName: "Ryan",
                  lastName: "Johnson",
                  reviewTitle: "Too Sweet for My Taste",
                  reviewDescription:
                    "While the quality is good, it's a bit too sweet for my liking.",
                  reviewStars: 3,
                },

                {
                  firstName: "Ella",
                  lastName: "Brown",
                  reviewTitle: "Great for Baking",
                  reviewDescription:
                    "I use this honey in all my baking recipes. It adds a wonderful touch.",
                  reviewStars: 4,
                },

                {
                  firstName: "James",
                  lastName: "Davis",
                  reviewTitle: "Not What I Expected",
                  reviewDescription:
                    "I was hoping for a stronger floral flavor, but it's quite mild.",
                  reviewStars: 2,
                },

                {
                  firstName: "Sophia",
                  lastName: "Garcia",
                  reviewTitle: "Best Honey I've Tried",
                  reviewDescription:
                    "Absolutely love this honey! It’s perfect on toast or in smoothies.",
                  reviewStars: 5,
                },

                {
                  firstName: "Liam",
                  lastName: "Martinez",
                  reviewTitle: "Good Quality, A Bit Pricey",
                  reviewDescription:
                    "The honey is great, but it feels a bit overpriced for the amount.",
                  reviewStars: 4,
                },
              ],
            },
          },

          {
            title: "Manuka Honey",
            latestPrice: "999",
            oldPrice: "1399",
            shortDescription:
              "Manuka Honey is a unique, premium honey produced by bees that pollinate the Manuka bush, native to New Zealand and Australia. Renowned for its potent antibacterial and anti-inflammatory properties, it contains high levels of methylglyoxal (MGO), which contribute to its therapeutic benefits. Manuka honey is often used for its medicinal qualities, including wound healing, soothing sore throats, and supporting digestive health, while also serving as a natural, flavorful sweetener in foods and beverages.",
            longDescription:
              "Manuka Honey is a premium, highly sought-after honey derived from the nectar of the Manuka tree (Leptospermum scoparium), native to New Zealand and parts of Australia. Known for its potent antibacterial properties and rich, earthy flavor, Manuka Honey is distinct from other types of honey due to its unique medicinal qualities and rigorous production standards. The honey's efficacy is often measured by its Unique Manuka Factor (UMF) or Methylglyoxal (MGO) content, which indicates its strength and purity. In culinary applications, Manuka Honey is prized for its complex, robust flavor that adds depth to both sweet and savory dishes. It can be used as a natural sweetener in teas, smoothies, and desserts, or as a glaze for meats and vegetables. Beyond its delightful taste, incorporating Manuka Honey into your diet can provide numerous health benefits, making it a valuable addition to your pantry. Manuka Honey is renowned for its exceptional health benefits, particularly its antibacterial and antimicrobial properties. Research has shown that it can help in treating wounds, promoting healing, and reducing inflammation. It is often used as a natural remedy for sore throats, digestive issues, and skin conditions such as acne and eczema. The honey's high antioxidant content also supports overall health and well-being by combating free radicals and boosting the immune system. Furthermore, Manuka Honey's production adheres to strict standards to ensure quality and authenticity. Each batch undergoes rigorous testing to confirm its UMF or MGO levels, guaranteeing that consumers receive a product that meets the highest standards of purity and potency. This commitment to quality not only ensures the honey's effectiveness but also supports sustainable and ethical beekeeping practices. Manuka Honey is more than just a sweet treat; it is a powerhouse of natural health benefits. Whether used in cooking, as a natural remedy, or as part of a skincare routine, its unparalleled qualities make it a cherished and versatile product. With its distinctive taste and proven therapeutic properties, Manuka Honey is an exceptional choice for those seeking to enhance their health and culinary experiences.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/MH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/MH_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/MH_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/MH_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/MH_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Megan",
                  lastName: "Roberts",
                  reviewTitle: "Amazing Health Benefits",
                  reviewDescription:
                    "This Manuka honey has been great for my immune system. Highly recommend!",
                  reviewStars: 5,
                },

                {
                  firstName: "Oliver",
                  lastName: "Johnson",
                  reviewTitle: "Good, but Expensive",
                  reviewDescription:
                    "The quality is excellent, but the price is quite high.",
                  reviewStars: 4,
                },

                {
                  firstName: "Chloe",
                  lastName: "Smith",
                  reviewTitle: "Great for Sore Throats",
                  reviewDescription:
                    "I use this honey whenever I have a sore throat. It works wonders!",
                  reviewStars: 5,
                },

                {
                  firstName: "William",
                  lastName: "Brown",
                  reviewTitle: "Not Worth the Hype",
                  reviewDescription:
                    "It's good honey, but I didn't find it to be significantly better than regular honey.",
                  reviewStars: 3,
                },
              ],
            },
          },

          {
            title: "Organic Clover Honey",
            latestPrice: "999",
            oldPrice: "1299",
            shortDescription:
              "Organic Clover Honey is a pure, natural honey made from the nectar of clover flowers, known for its mild, sweet taste and light golden color. Certified organic, it is free from pesticides and chemicals, ensuring a wholesome and nutritious product. Rich in antioxidants, vitamins, and minerals, this honey is a versatile sweetener for beverages, baking, and cooking, and can also be enjoyed on its own for its delightful flavor and health benefits.",
            longDescription:
              "Organic Clover Honey is a pure, high-quality honey harvested from the nectar of clover flowers, produced without the use of pesticides, chemicals, or synthetic fertilizers. This honey is celebrated for its mild, delicate flavor and light golden color, making it a versatile and popular choice for various culinary and health applications. The organic certification ensures that the honey is produced in an environmentally friendly and sustainable manner, adhering to stringent standards that promote the health of bees and the environment. In culinary uses, Organic Clover Honey is prized for its smooth, sweet taste that complements a wide range of dishes. It can be used as a natural sweetener in beverages like tea and coffee, drizzled over cereals, yogurt, and pancakes, or incorporated into baking recipes to add a subtle sweetness. Its mild flavor makes it an excellent ingredient for salad dressings, marinades, and sauces, where it enhances the taste without overpowering other ingredients. Beyond its culinary applications, Organic Clover Honey is known for its health benefits. It contains natural antioxidants, vitamins, and minerals that support overall health and well-being. The honey's antibacterial and anti-inflammatory properties make it a popular remedy for soothing sore throats, coughs, and minor wounds. Additionally, Organic Clover Honey is often used in skincare routines for its moisturizing and healing properties, providing nourishment and hydration to the skin. Organic Clover Honey is also a testament to sustainable and ethical beekeeping practices. The organic certification ensures that the honey is free from harmful chemicals and is produced in a way that supports the health of bees and their natural habitats. This commitment to sustainability not only results in a purer product but also contributes to the preservation of biodiversity and the health of our ecosystems. With its delightful taste, numerous health benefits, and commitment to organic production, Organic Clover Honey is a wholesome and versatile choice for anyone looking to incorporate natural sweetness into their diet and wellness routines. Whether enjoyed on its own, used in cooking, or applied in natural remedies, this honey is a pure and healthful addition to any household.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OCH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OCH_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OCH_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OCH_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OCH_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Alice",
                  lastName: "Thompson",
                  reviewTitle: "Light and Delicious",
                  reviewDescription:
                    "This clover honey has a light, delicate flavor that's perfect for my tea.",
                  reviewStars: 5,
                },

                {
                  firstName: "Daniel",
                  lastName: "Lee",
                  reviewTitle: "Good Quality",
                  reviewDescription:
                    "The quality of this honey is great, but I prefer a stronger taste.",
                  reviewStars: 4,
                },

                {
                  firstName: "Grace",
                  lastName: "Harris",
                  reviewTitle: "Perfect for Baking",
                  reviewDescription:
                    "I use this honey in all my baking recipes. It adds a wonderful, mild sweetness.",
                  reviewStars: 5,
                },

                {
                  firstName: "Henry",
                  lastName: "Martinez",
                  reviewTitle: "Not My Favorite",
                  reviewDescription:
                    "The honey is okay, but I found it to be a bit too mild for my taste.",
                  reviewStars: 3,
                },

                {
                  firstName: "Sophia",
                  lastName: "Williams",
                  reviewTitle: "Great All-Purpose Honey",
                  reviewDescription:
                    "This is a fantastic all-purpose honey. I use it in my tea, on toast, and in cooking.",
                  reviewStars: 5,
                },
              ],
            },
          },

          {
            title: "Acacia Honey",
            latestPrice: "1499",
            oldPrice: "1899",
            shortDescription:
              "Acacia Honey is a light, clear honey derived from the nectar of acacia tree blossoms, known for its delicate, sweet flavor and floral aroma. It is slow to crystallize, maintaining its smooth, liquid consistency for a long time. Rich in fructose and low in sucrose, acacia honey is a healthier alternative to regular sugar and is often used as a natural sweetener in beverages, desserts, and culinary dishes. Additionally, it offers potential health benefits such as antibacterial properties and digestive support.",
            longDescription:
              "Acacia Honey is a premium honey known for its light, delicate flavor and pale, almost translucent appearance. Sourced from the nectar of acacia tree blossoms, particularly the black locust tree (Robinia pseudoacacia), this honey is prized for its high quality and unique characteristics. Its mild, floral taste and smooth texture make it a favorite among honey enthusiasts and culinary experts alike. In the kitchen, Acacia Honey is incredibly versatile. Its subtle sweetness enhances a variety of dishes without overpowering other flavors. It is an excellent natural sweetener for teas, coffee, and smoothies, adding a gentle touch of sweetness. Acacia Honey can also be drizzled over yogurt, oatmeal, and fresh fruits, or used as a sweetener in baking recipes. Its light flavor pairs well with cheeses and can be used to create sophisticated salad dressings, glazes, and marinades. One of the standout features of Acacia Honey is its slow crystallization process. Unlike many other types of honey, Acacia Honey remains liquid for a longer period, making it easy to use and store. This characteristic, along with its clear, golden hue, adds to its appeal and versatility in various culinary applications. Beyond its culinary uses, Acacia Honey is celebrated for its health benefits. It is rich in natural antioxidants, which help combat oxidative stress and support overall health. The honey also contains vitamins and minerals that contribute to well-being. Its natural antibacterial and anti-inflammatory properties make it a soothing remedy for sore throats, coughs, and minor skin irritations. Additionally, Acacia Honey has a lower glycemic index compared to other honeys, making it a preferred choice for those monitoring their blood sugar levels. Acacia Honey is also produced with a commitment to quality and sustainability. Ethical beekeeping practices ensure that the honey is free from pesticides and chemicals, supporting the health of bees and their ecosystems. This dedication to purity and environmental stewardship results in a honey that is both delicious and beneficial for the planet. With its exquisite flavor, healthful properties, and sustainable production, Acacia Honey is a delightful addition to any pantry. Whether used in cooking, as a natural remedy, or enjoyed on its own, this honey offers a touch of nature’s finest sweetness and nourishment.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AH_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AH_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AH_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AH_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AH_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Emma",
                  lastName: "Johnson",
                  reviewTitle: "Smooth and Mild",
                  reviewDescription:
                    "This acacia honey has a smooth texture and a mild flavor that I love.",
                  reviewStars: 5,
                },

                {
                  firstName: "Michael",
                  lastName: "Smith",
                  reviewTitle: "Great for Tea",
                  reviewDescription:
                    "I use this honey in my tea, and it sweetens it perfectly without overpowering.",
                  reviewStars: 4,
                },

                {
                  firstName: "Olivia",
                  lastName: "Williams",
                  reviewTitle: "Too Sweet for My Taste",
                  reviewDescription:
                    "While the quality is good, it's a bit sweeter than I expected.",
                  reviewStars: 3,
                },

                {
                  firstName: "Lucas",
                  lastName: "Brown",
                  reviewTitle: "Excellent Choice",
                  reviewDescription:
                    "This honey is fantastic! It's versatile and works well in various recipes.",
                  reviewStars: 5,
                },

                {
                  firstName: "Sophia",
                  lastName: "Davis",
                  reviewTitle: "Not as Floral as I Hoped",
                  reviewDescription:
                    "I was expecting a stronger floral taste, but it's quite subtle.",
                  reviewStars: 2,
                },

                {
                  firstName: "Liam",
                  lastName: "Garcia",
                  reviewTitle: "Perfect for Drizzling",
                  reviewDescription:
                    "This honey is perfect for drizzling on yogurt or pancakes. Highly recommend!",
                  reviewStars: 5,
                },

                {
                  firstName: "Chloe",
                  lastName: "Martinez",
                  reviewTitle: "Good Quality, Pricey",
                  reviewDescription:
                    "The quality is great, but it feels a bit overpriced for the quantity.",
                  reviewStars: 4,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const cowGheeCategory = await prisma.category.create({
    data: {
      name: "Ghee",
      posterImage:
        "https://d3rts3x4c8sg1r.cloudfront.net/Category_Images/GheeCategoryPoster.jpeg",
      products: {
        create: [
          {
            title: "Organic Grass-Fed Cow Ghee",
            latestPrice: "549",
            oldPrice: "580",
            shortDescription:
              "Organic Grass-Fed Cow Ghee is a clarified butter made from the milk of cows that are exclusively grass-fed, ensuring high quality and rich nutritional value. This golden, nutty-flavored fat is lactose-free and contains beneficial fats, vitamins, and antioxidants, making it a healthy cooking option. Ideal for high-heat cooking, baking, and as a spread, organic grass-fed cow ghee is celebrated for its unique flavor and numerous health benefits, including supporting digestive health and promoting overall wellness.",
            longDescription:
              "Organic Grass-Fed Cow Ghee is a high-quality clarified butter made from the milk of cows that graze on organic grass pastures. Renowned for its rich flavor and numerous health benefits, ghee is a staple in many culinary traditions, particularly in Indian cooking. The process of making ghee involves slowly simmering butter to remove moisture and milk solids, resulting in a golden, aromatic fat that is rich in nutrients and has a high smoke point, making it ideal for cooking at high temperatures. In the kitchen, Organic Grass-Fed Cow Ghee is celebrated for its versatility. It can be used for sautéing, frying, or baking, imparting a delicious nutty flavor to dishes. Its high smoke point (around 450°F or 232°C) allows for safe cooking without the risk of burning, making it an excellent choice for various cooking methods. Ghee is also perfect for drizzling over vegetables, enhancing the flavor of curries, or as a rich base for sauces and dressings. Beyond its culinary applications, Organic Grass-Fed Cow Ghee is packed with health benefits. It is rich in healthy fats, including butyrate, which is known to support gut health and reduce inflammation. Ghee is also a source of essential vitamins, such as A, D, E, and K, which are important for overall health and immunity. Additionally, because ghee is lactose-free and casein-free, it is often well-tolerated by those with dairy sensitivities. The organic and grass-fed nature of this ghee means that it is produced without the use of antibiotics or hormones, and it supports sustainable farming practices that prioritize animal welfare and environmental health. Cows raised on grass produce milk that is higher in beneficial omega-3 fatty acids and conjugated linoleic acid (CLA), enhancing the nutritional profile of the ghee. With its rich flavor, high nutritional value, and commitment to quality, Organic Grass-Fed Cow Ghee is a wholesome choice for anyone looking to enhance their cooking and overall health. Whether used in traditional recipes, as a cooking oil, or as a nutritious addition to meals, ghee offers a delightful and healthful option that embodies the goodness of nature.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OGF_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OGF_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OGF_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OGF_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OGF_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Sarah",
                  lastName: "Taylor",
                  reviewTitle: "Rich and Flavorful",
                  reviewDescription:
                    "This ghee has a rich, buttery flavor that enhances all my dishes. Absolutely love it!",
                  reviewStars: 5,
                },

                {
                  firstName: "David",
                  lastName: "Wilson",
                  reviewTitle: "Great Quality, But Pricey",
                  reviewDescription:
                    "The quality is excellent, but I find it a bit on the expensive side.",
                  reviewStars: 3,
                },

                {
                  firstName: "Emily",
                  lastName: "Clark",
                  reviewTitle: "Too Strong for My Taste",
                  reviewDescription:
                    "I found the flavor to be a bit too strong compared to other ghee I've tried.",
                  reviewStars: 3,
                },

                {
                  firstName: "Michael",
                  lastName: "Anderson",
                  reviewTitle: "Perfect for Cooking",
                  reviewDescription:
                    "This ghee is perfect for frying and adds a delicious depth to my meals.",
                  reviewStars: 5,
                },
              ],
            },
          },
          {
            title: "A2 Desi Cow Ghee",
            latestPrice: "2649",
            oldPrice: "2795",
            shortDescription:
              "A2 Desi Cow Ghee is a premium clarified butter derived from the milk of A2 breed cows, known for its rich, nutty flavor and superior nutritional profile. This traditional ghee is made through an artisanal process, preserving its beneficial nutrients and healthy fats. Packed with vitamins, antioxidants, and fatty acids, A2 Desi Cow Ghee is revered for its potential health benefits, including aiding digestion and supporting overall wellness. It’s perfect for cooking, baking, or as a wholesome addition to various dishes.",
            longDescription:
              "A2 Desi Cow Ghee is a premium clarified butter derived from the milk of indigenous A2 cows, known for their traditional and natural farming practices. This ghee is cherished for its rich flavor, aromatic qualities, and numerous health benefits. The A2 milk used in its production comes from cows that produce a specific protein variant, A2 beta-casein, which is often easier to digest for many people compared to A1 milk. In culinary applications, A2 Desi Cow Ghee is highly versatile. Its unique nutty flavor enhances a variety of dishes, making it ideal for sautéing, frying, and baking. With a high smoke point (around 450°F or 232°C), it can withstand high temperatures without burning, making it perfect for traditional Indian cooking and other cuisines. A2 Desi Cow Ghee can be used in curries, drizzled over vegetables, or spread on bread, adding depth and richness to meals. Beyond its culinary uses, A2 Desi Cow Ghee is celebrated for its health-promoting properties. It is rich in healthy fats, including butyrate, which supports gut health and has anti-inflammatory effects. Additionally, A2 Desi Cow Ghee contains essential vitamins like A, D, E, and K, contributing to overall well-being. Its lactose-free and casein-free nature makes it suitable for those with dairy sensitivities, allowing more people to enjoy its benefits. Produced through traditional methods, A2 Desi Cow Ghee often comes from cows raised on organic pastures, ensuring that it is free from antibiotics and hormones. This commitment to quality not only enhances the ghee's nutritional profile but also supports sustainable and ethical farming practices that prioritize animal welfare and environmental health. With its exceptional taste, nutritional benefits, and dedication to traditional production methods, A2 Desi Cow Ghee is a wholesome choice for anyone looking to elevate their cooking and embrace a healthier lifestyle. Whether used in everyday meals or special recipes, this ghee embodies the richness of nature and the goodness of indigenous farming practices.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/ADG_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/ADG_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/ADG_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/ADG_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/ADG_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Ananya",
                  lastName: "Patel",
                  reviewTitle: "Authentic Taste",
                  reviewDescription:
                    "This ghee has an authentic taste that reminds me of homemade ghee. Truly exceptional!",
                  reviewStars: 5,
                },

                {
                  firstName: "Raj",
                  lastName: "Sharma",
                  reviewTitle: "Good Quality, but Expensive",
                  reviewDescription:
                    "The quality is great, but I feel it’s a bit pricey compared to regular ghee.",
                  reviewStars: 4,
                },

                {
                  firstName: "Priya",
                  lastName: "Kumar",
                  reviewTitle: "Mild Flavor",
                  reviewDescription:
                    "I was hoping for a stronger flavor, but it’s quite mild and not very distinct.",
                  reviewStars: 3,
                },

                {
                  firstName: "Arjun",
                  lastName: "Mehta",
                  reviewTitle: "Ideal for Cooking",
                  reviewDescription:
                    "Perfect for cooking and adds a wonderful aroma to my dishes. Highly recommend!",
                  reviewStars: 5,
                },

                {
                  firstName: "Nisha",
                  lastName: "Verma",
                  reviewTitle: "Not as Creamy as Expected",
                  reviewDescription:
                    "The texture was not as creamy as I expected. It’s decent but could be better.",
                  reviewStars: 2,
                },

                {
                  firstName: "Suresh",
                  lastName: "Nair",
                  reviewTitle: "Great for Health",
                  reviewDescription:
                    "I love that it’s made from A2 milk. It feels healthier and tastes great!",
                  reviewStars: 4,
                },
              ],
            },
          },
          {
            title: "Organic Buffalo Ghee",
            latestPrice: "499",
            oldPrice: "999",
            shortDescription:
              "Organic Buffalo Ghee is a rich, clarified butter made from the milk of organically raised buffalo, known for its creamy texture and robust flavor. This ghee is produced through traditional methods that preserve its nutritional integrity, offering a high concentration of beneficial fats, vitamins, and antioxidants. Ideal for cooking at high temperatures, Organic Buffalo Ghee enhances the taste of dishes while providing potential health benefits, such as improved digestion and enhanced immunity, making it a valuable addition to any kitchen.",
            longDescription:
              "Organic Buffalo Ghee is a rich, creamy clarified butter made from the milk of organically raised buffaloes. Renowned for its deep flavor and smooth texture, this ghee is a staple in various culinary traditions, particularly in South Asian cooking. The process of making ghee involves slowly simmering butter to remove moisture and milk solids, resulting in a pure, golden fat that is high in nutrients and has a high smoke point, making it perfect for cooking. In the kitchen, Organic Buffalo Ghee is incredibly versatile. Its robust flavor enhances a wide range of dishes, from curries and rice to baked goods and sauces. With a high smoke point (around 450°F or 232°C), it is suitable for frying and sautéing without the risk of burning, making it an excellent choice for high-heat cooking. Its rich taste also makes it an ideal ingredient for drizzling over vegetables or using in traditional recipes. Beyond its culinary uses, Organic Buffalo Ghee is celebrated for its health benefits. It is rich in healthy fats, including butyrate, which is known to support gut health and reduce inflammation. This ghee is also a source of essential vitamins such as A, D, E, and K, which are important for overall health and immunity. Additionally, because it is lactose-free and casein-free, it is often well-tolerated by those with dairy sensitivities. Produced from buffaloes that are raised on organic pastures, Organic Buffalo Ghee is free from antibiotics and hormones, ensuring a high-quality product. This commitment to organic farming not only enhances the nutritional profile of the ghee but also supports sustainable agricultural practices that prioritize animal welfare and environmental health. With its robust flavor, high nutritional value, and commitment to organic production, Organic Buffalo Ghee is a wholesome choice for anyone looking to enhance their cooking and overall health. Whether used in traditional recipes, as a cooking oil, or as a nutritious addition to meals, this ghee offers a delightful and healthful option that embodies the goodness of nature.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OBG_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OBG_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OBG_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OBG_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/OBG_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Ravi",
                  lastName: "Singh",
                  reviewTitle: "Rich and Creamy",
                  reviewDescription:
                    "This buffalo ghee is incredibly rich and creamy. It enhances the flavor of my dishes!",
                  reviewStars: 5,
                },

                {
                  firstName: "Aditi",
                  lastName: "Sharma",
                  reviewTitle: "Good Quality, Pricey",
                  reviewDescription:
                    "The quality is excellent, but it's a bit expensive for my budget.",
                  reviewStars: 4,
                },

                {
                  firstName: "Karan",
                  lastName: "Verma",
                  reviewTitle: "Not What I Expected",
                  reviewDescription:
                    "I expected a stronger taste; it's milder than other ghee I've tried.",
                  reviewStars: 3,
                },

                {
                  firstName: "Sneha",
                  lastName: "Iyer",
                  reviewTitle: "Perfect for Cooking",
                  reviewDescription:
                    "This ghee is perfect for cooking. It adds a wonderful depth to my recipes.",
                  reviewStars: 5,
                },

                {
                  firstName: "Vikram",
                  lastName: "Desai",
                  reviewTitle: "Too Greasy",
                  reviewDescription:
                    "I found it to be greasier than I anticipated. It wasn't what I was looking for.",
                  reviewStars: 2,
                },

                {
                  firstName: "Meera",
                  lastName: "Nair",
                  reviewTitle: "Healthy and Delicious",
                  reviewDescription:
                    "I love using this ghee for its health benefits. Tastes great too!",
                  reviewStars: 4,
                },

                {
                  firstName: "Rahul",
                  lastName: "Kumar",
                  reviewTitle: "Excellent for Baking",
                  reviewDescription:
                    "I use this ghee in my baking, and it works wonderfully. Adds a nice flavor!",
                  reviewStars: 5,
                },

                {
                  firstName: "Pooja",
                  lastName: "Singh",
                  reviewTitle: "Good, but Pricey",
                  reviewDescription:
                    "The ghee is good quality, but I find it a bit overpriced for the amount.",
                  reviewStars: 3,
                },

                {
                  firstName: "Arjun",
                  lastName: "Patel",
                  reviewTitle: "Best Ghee I've Tried",
                  reviewDescription:
                    "This is the best buffalo ghee I’ve ever used! Highly recommend to everyone!",
                  reviewStars: 5,
                },
              ],
            },
          },
          {
            title: "Almond Ghee",
            latestPrice: "999",
            oldPrice: "1499",
            shortDescription:
              "Almond Ghee is a unique blend of clarified butter and almond oil, combining the rich, nutty flavor of almonds with the health benefits of ghee. This versatile ingredient is ideal for cooking, baking, or as a spread, offering a creamy texture and a delicious taste. Rich in healthy fats, vitamins, and antioxidants, Almond Ghee supports digestion and provides sustained energy, making it a wholesome addition to a balanced diet while enhancing the flavor of a variety of dishes.",
            longDescription:
              "Almond Ghee is a unique and nutritious blend of clarified butter and almond oil, combining the rich, buttery flavor of ghee with the nutty essence of almonds. This fusion creates a versatile cooking fat that not only enhances the taste of various dishes but also offers a wealth of health benefits. Almond Ghee is rich in healthy fats, antioxidants, and essential nutrients, making it a wholesome addition to any diet. In the kitchen, Almond Ghee is incredibly versatile. Its smooth texture and aromatic flavor make it ideal for sautéing, frying, or baking. It can be used as a flavorful base for curries, drizzled over roasted vegetables, or spread on toast. With a high smoke point, Almond Ghee can withstand high cooking temperatures, allowing it to be used in a variety of culinary applications without burning. The health benefits of Almond Ghee are noteworthy. It combines the advantages of both ghee and almond oil, providing healthy fats that support heart health and promote overall wellness. Almonds are known for their high content of vitamin E, which acts as a powerful antioxidant, and healthy monounsaturated fats that can aid in cholesterol management. Additionally, the presence of butyrate in ghee supports gut health and may reduce inflammation. Almond Ghee is also lactose-free and casein-free, making it a suitable option for those with dairy sensitivities or looking to avoid dairy altogether. This makes it an excellent alternative for those seeking a nutritious cooking fat without the adverse effects associated with conventional dairy products. With its delightful flavor, impressive nutritional profile, and versatile uses, Almond Ghee is a fantastic choice for anyone looking to elevate their cooking while embracing a healthier lifestyle. Whether used in everyday meals or as a special ingredient in gourmet recipes, Almond Ghee offers a delicious and healthful option that embodies the best of both worlds.",
            images: {
              create: [
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AG_1.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AG_2.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AG_3.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AG_4.jpeg",
                },
                {
                  url: "https://d3rts3x4c8sg1r.cloudfront.net/Product_Images/AG_5.jpeg",
                },
              ],
            },
            reviews: {
              create: [
                {
                  firstName: "Nisha",
                  lastName: "Kumar",
                  reviewTitle: "Unique Flavor",
                  reviewDescription:
                    "This almond ghee has a unique flavor that elevates my cooking. Love it!",
                  reviewStars: 5,
                },

                {
                  firstName: "Raj",
                  lastName: "Sharma",
                  reviewTitle: "Good, But Pricey",
                  reviewDescription:
                    "The quality is excellent, but it’s a bit expensive compared to regular ghee.",
                  reviewStars: 4,
                },

                {
                  firstName: "Priya",
                  lastName: "Verma",
                  reviewTitle: "Not as Creamy",
                  reviewDescription:
                    "I expected a creamier texture; it was a bit grainy for my taste.",
                  reviewStars: 3,
                },

                {
                  firstName: "Vikram",
                  lastName: "Singh",
                  reviewTitle: "Perfect for Smoothies",
                  reviewDescription:
                    "I love using this ghee in my smoothies. It adds a nice nutty flavor!",
                  reviewStars: 5,
                },

                {
                  firstName: "Aditi",
                  lastName: "Iyer",
                  reviewTitle: "Too Strong for Cooking",
                  reviewDescription:
                    "The almond flavor was a bit too strong for my savory dishes.",
                  reviewStars: 2,
                },

                {
                  firstName: "Karan",
                  lastName: "Patel",
                  reviewTitle: "Great for Baking",
                  reviewDescription:
                    "This almond ghee works wonderfully in my baking recipes. Highly recommend!",
                  reviewStars: 4,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const query = await prisma.query.createMany({
    data: [
      {
        name: "Jessica Brown",
        email: "jessica.brown@example.com",
        subject: "Inquiry About Organic Products",
        message:
          "Hello, I hope this message finds you well. I am very interested in your range of organic products and would love to learn more about them. Specifically, I am curious about the sourcing of your ingredients and whether you have any upcoming promotions or discounts. I am looking to make a purchase soon and would appreciate any additional information you can provide. Thank you for your assistance!",
      },

      {
        name: "Michael Chen",
        email: "michael.chen@example.com",
        subject: "Shipping Information",
        message:
          "Hi there, I recently placed an order on your website and wanted to inquire about the shipping options available. I am particularly interested in understanding the estimated delivery times and whether there are express shipping options for faster delivery. Additionally, could you provide any tracking information once the order is shipped? Your help would be greatly appreciated!",
      },

      {
        name: "Sara Patel",
        email: "sara.patel@example.com",
        subject: "Bulk Order Inquiry",
        message:
          "Dear Team, I am looking to place a bulk order for your ghee products as I run a small health food store. I would love to know if there are any discounts available for bulk purchases and the process for placing such an order. Additionally, it would be helpful to get information on the minimum order quantities and shipping options for bulk orders. Thank you for your time, and I look forward to your prompt response!",
      },

      {
        name: "David Smith",
        email: "david.smith@example.com",
        subject: "Feedback on Recent Purchase",
        message:
          "Hello, I hope you are doing well. I recently purchased your almond ghee and wanted to take a moment to share my feedback. Overall, I am very pleased with the quality and flavor, but I did encounter some challenges with the packaging that I believe could be improved. I would like to suggest a more user-friendly design that could enhance the experience for customers. Thank you for considering my feedback, and I look forward to hearing your thoughts!",
      },
    ],
  });

  console.log({ oilCategory, honeyCategory, cowGheeCategory, query });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
