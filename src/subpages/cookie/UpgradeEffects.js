import React, { useEffect, useState } from "react";
import { useTransition, animated } from 'react-spring'; // For animations
import "./UpgradeEffects.css"; // You can define any additional CSS for animations

const UpgradeEffects = ({ upgrades }) => {
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    const newEffects = [];

    // Check each upgrade and add corresponding effects
    upgrades.forEach(upgrade => {
      if (upgrade.bought) {
        switch (upgrade.name) {
          case "Invisible Cat":
            newEffects.push({ type: 'cat', description: "Invisible Cat" });
            break;
          case "Dancing Banana":
            newEffects.push({ type: 'banana', description: "Dancing Banana" });
            break;
          case "Time-Traveling Pizza":
            newEffects.push({ type: 'pizza', description: "Time-Traveling Pizza" });
            break;
          case "Quantum Cookie":
            newEffects.push({ type: 'quantum', description: "Quantum Cookie" });
            break;
          // Add cases for other upgrades here
          default:
            break;
        }
      }
    });

    setEffects(newEffects);
  }, [upgrades]);

  // Animation transitions using react-spring
  const transitions = useTransition(effects, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  return (
    <div className="upgrade-effects-container">
      {transitions((style, item) => (
        <animated.div style={style} className={`effect-${item.type}`}>
          {/* Render different elements based on the effect type */}
          {item.type === 'cat' && <div className="cat-icon">🐱</div>}
          {item.type === 'banana' && <div className="banana-icon">🍌</div>}
          {item.type === 'pizza' && <div className="pizza-icon">🍕</div>}
          {item.type === 'quantum' && <div className="quantum-icon">🍪</div>}
        </animated.div>
      ))}
    </div>
  );
};

export default UpgradeEffects;
