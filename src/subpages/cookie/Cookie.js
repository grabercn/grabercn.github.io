import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ShopModal from "./ShopModal"; // Import the ShopModal
import "./Cookie.css"; // Import the CSS file for animations
import ParticlesBackground from "../../animations/ParticlesBackground";

const { Title } = Typography;

const CookieClicker = () => {
  const [cookies, setCookies] = useState(0); // Number of cookies collected
  const [cookiePerClick, setCookiePerClick] = useState(1); // Cookies gained per click
  const [autoClickerCount, setAutoClickerCount] = useState(0); // Number of auto clicks per second
  const [upgrades, setUpgrades] = useState([
      {
        "name": "Dancing Banana",
        "cost": 50,
        "effect": 0,
        "bought": false,
        "description": "This banana doesn’t just sit there, it dances! It makes you feel better about your life choices, but it won’t actually help you get cookies.",
        "tags": ["Cosmetic", "Just for Fun"],
        "autoClickerEffect": 0
      },
      {
        "name": "Invisible Cat",
        "cost": 100,
        "effect": 0,
        "bought": false,
        "description": "It’s an invisible cat. You can’t see it, but it’s definitely helping. Trust us, cats are known for their cookie magic.",
        "tags": ["Auto Clicker", "Pet"],
        "autoClickerEffect": 2
      },
      {
        "name": "Time-Traveling Pizza",
        "cost": 250,
        "effect": 0,
        "bought": false,
        "description": "A pizza that bends time. It returns with cookies from the future. Think of it as a really delicious way to save time.",
        "tags": ["Auto Clicker", "Food"],
        "autoClickerEffect": 5
      },
      {
        "name": "Quantum Cookie",
        "cost": 500,
        "effect": 0,
        "bought": false,
        "description": "A cookie that exists in multiple states at once. It doesn’t make sense, but neither does this game.",
        "tags": ["Auto Clicker", "Quantum Physics"],
        "autoClickerEffect": 10
      },
      {
        "name": "Click Boosting Juice",
        "cost": 750,
        "effect": 15,
        "bought": false,
        "description": "A refreshing drink that gives your click power a little extra kick! It boosts your click rate for a limited time.",
        "tags": ["Boosts Click Rate", "Drink"],
        "autoClickerEffect": 0
      },
      {
        "name": "Grandma with a Jetpack",
        "cost": 800,
        "effect": 20,
        "bought": false,
        "description": "Grandma has upgraded! Now she can boost your cookies *and* fly. What a time to be alive.",
        "tags": ["Boosts Click Rate", "Grandma", "Flying"],
        "autoClickerEffect": 0
      },
      {
        "name": "Invisible Rollercoaster",
        "cost": 1500,
        "effect": 0,
        "bought": false,
        "description": "It’s a rollercoaster. But you can’t see it. It’s invisible! Still boosts cookies though, somehow.",
        "tags": ["Auto Clicker", "Adventure"],
        "autoClickerEffect": 15
      },
      {
        "name": "Disco Cookie",
        "cost": 2500,
        "effect": 0,
        "bought": false,
        "description": "The cookie has hit the dance floor. Get ready for a funky cookie generation experience.",
        "tags": ["Auto Clicker", "Party"],
        "autoClickerEffect": 20
      },
      {
        "name": "Click Frenzy Tonic",
        "cost": 4000,
        "effect": 50,
        "bought": false,
        "description": "A magical tonic that makes every click count for double the cookies. Drink up for a limited time boost.",
        "tags": ["Boosts Click Rate", "Drink"],
        "autoClickerEffect": 0
      },
      {
        "name": "Space-Time Warp Engine",
        "cost": 5000,
        "effect": 0,
        "bought": false,
        "description": "A machine that bends the fabric of space-time to generate cookies. Now that’s what we call innovation!",
        "tags": ["Auto Clicker", "Sci-Fi"],
        "autoClickerEffect": 50
      },
      {
        "name": "Pirate Ship",
        "cost": 8000,
        "effect": 0,
        "bought": false,
        "description": "Arr matey! This pirate ship comes with an army of cookie-seeking pirates. They steal cookies from unsuspecting space travelers.",
        "tags": ["Auto Clicker", "Pirates"],
        "autoClickerEffect": 100
      },
      {
        "name": "Hyper-Efficient Cookie Machine",
        "cost": 12000,
        "effect": 0,
        "bought": false,
        "description": "The cookie machine has become *too* efficient. It makes cookies in the blink of an eye. The future is now!",
        "tags": ["Auto Clicker", "Technology"],
        "autoClickerEffect": 200
      },
      {
        "name": "Click Explosion Bomb",
        "cost": 16000,
        "effect": 100,
        "bought": false,
        "description": "A bomb that explodes with cookies every time you click. Get ready for a cookie explosion!",
        "tags": ["Boosts Click Rate", "Explosion"],
        "autoClickerEffect": 0
      },
      {
        "name": "Robot Butler",
        "cost": 18000,
        "effect": 0,
        "bought": false,
        "description": "He’ll bring you cookies on a silver platter. Literally. And he’s made of metal. Not the best at conversation though.",
        "tags": ["Auto Clicker", "Robot"],
        "autoClickerEffect": 500
      },
      {
        "name": "Giant Cookie",
        "cost": 25000,
        "effect": 0,
        "bought": false,
        "description": "The biggest cookie ever baked. It’s so big, you need a small army to lift it. Good thing you’ve got one!",
        "tags": ["Boosts Click Rate", "Giant"],
        "autoClickerEffect": 0
      },
      {
        "name": "Alien Cookie Harvesters",
        "cost": 35000,
        "effect": 0,
        "bought": false,
        "description": "Alien technology, bringing you cookies at an unfathomable rate. They might also want to take over Earth. You’re welcome.",
        "tags": ["Auto Clicker", "Aliens"],
        "autoClickerEffect": 1000
      },
      {
        "name": "Black Hole Cookie Factory",
        "cost": 50000,
        "effect": 0,
        "bought": false,
        "description": "It’s a black hole. But it’s a cookie factory too. The cookies come from another dimension, where gravity doesn’t apply.",
        "tags": ["Auto Clicker", "Cosmic"],
        "autoClickerEffect": 2500
      },
      {
        "name": "The Cookie King",
        "cost": 75000,
        "effect": 0,
        "bought": false,
        "description": "The legendary Cookie King has arrived. His kingdom produces cookies at an unimaginable rate. All hail the Cookie King!",
        "tags": ["Auto Clicker", "Royalty"],
        "autoClickerEffect": 5000
      },
      {
        "name": "Zombie Cookie Army",
        "cost": 100000,
        "effect": 0,
        "bought": false,
        "description": "A horde of zombies, risen from the grave to bring you cookies. They’re slow, but they don’t stop working. Ever.",
        "tags": ["Auto Clicker", "Zombies"],
        "autoClickerEffect": 10000
      },
      {
        "name": "Caffeine-Infused Cookie Factory",
        "cost": 150000,
        "effect": 0,
        "bought": false,
        "description": "This factory runs on pure caffeine. Expect cookies in *hyperdrive* mode. It might make the cookies a little jittery.",
        "tags": ["Auto Clicker", "Factory", "Caffeine"],
        "autoClickerEffect": 20000
      },
      {
        "name": "Banana-powered Cookie Blaster",
        "cost": 200000,
        "effect": 0,
        "bought": false,
        "description": "This cookie blaster runs on bananas. Don’t ask how, it just works. Who knew bananas could power technology this well?",
        "tags": ["Auto Clicker", "Technology", "Bananas"],
        "autoClickerEffect": 50000
      },
      {
        "name": "Intergalactic Cookie Delivery Service",
        "cost": 300000,
        "effect": 0,
        "bought": false,
        "description": "Cookies delivered to you from every corner of the galaxy. Expect a lot of cookies, and a lot of alien deliverymen.",
        "tags": ["Auto Clicker", "Space Travel"],
        "autoClickerEffect": 100000
      }    
  ]);

  const [shopVisible, setShopVisible] = useState(false); // Whether shop modal is visible
  const [isCookieClicked, setIsCookieClicked] = useState(false); // Whether the cookie is clicked

  // Click cookie function
  const handleClickCookie = () => {
    setCookies(cookies + cookiePerClick);
    setIsCookieClicked(true); // Start the animation for cookie click
    setTimeout(() => setIsCookieClicked(false), 500); // Reset animation after 500ms
  };

  // Buy upgrade function
  const handleBuyUpgrade = (index, upgrade) => {
    if (cookies >= upgrade.cost && !upgrade.bought) {
      setCookies(cookies - upgrade.cost);

      const newUpgrades = [...upgrades];
      newUpgrades[index].bought = true;
      setUpgrades(newUpgrades); // Update the state to mark the upgrade as bought

      if (upgrade.effect > 0) {
        setCookiePerClick(cookiePerClick + upgrade.effect); // Increase cookies per click
      }

      // Update auto clicker count by summing the autoClickerEffect values
      updateAutoClickerCount();
    }
  };

  // Function to update auto clicker count based on all bought upgrades
  const updateAutoClickerCount = () => {
    const totalAutoClickerEffect = upgrades
      .filter((upgrade) => upgrade.bought)
      .reduce((total, upgrade) => total + upgrade.autoClickerEffect, 0);

    setAutoClickerCount(totalAutoClickerEffect); // Set the total auto clicker effect
  };

  // Show Shop Modal
  const showShopModal = () => {
    setShopVisible(true);
  };

  // Hide Shop Modal
  const hideShopModal = () => {
    setShopVisible(false);
  };

  // Auto cookie generator logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoClickerCount > 0) {
        setCookies((prevCookies) => prevCookies + autoClickerCount);
      }
    }, 1000); // Update cookies every second based on auto clickers

    return () => clearInterval(interval); // Clear the interval when component unmounts
  }, [autoClickerCount]);

  return (
    <div className="cookie-clicker-container">

      <ParticlesBackground />

      <Title level={2}>Cookie Clicker</Title>
      <div className="cookie-icon-container" onClick={handleClickCookie}>
        <img
          className={`cookie-icon ${isCookieClicked ? "cookie-clicked" : ""}`}
          src="https://purepng.com/public/uploads/large/purepng.com-cookiescookiessnacksbaked-snacksflour-cookieschocolate-cookies-1411527249039ulhcg.png"
          alt="Cookie Icon"
        />
      </div>
      <div className="cookie-count">
        Cookies: {cookies}
      </div>
      <div className="additional-stats">
        <p>Click Rate: {cookiePerClick} cookies/click</p>
        <p>Auto Clickers: {autoClickerCount} per second</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Button
          type="dashed"
          icon={<ShoppingCartOutlined />}
          size="large"
          onClick={showShopModal}
        >
          Open Shop
        </Button>
      </div>

      {/* Shop Modal */}
      <ShopModal
        visible={shopVisible}
        onClose={hideShopModal}
        cookies={cookies}
        upgrades={upgrades}
        onBuyUpgrade={handleBuyUpgrade}
      />
    </div>
  );
};

export default CookieClicker;
