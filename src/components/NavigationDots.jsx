import React from 'react'

const NavigationDots = ({active}) => {
  const navArr = ["home", "about", "work", "skills", "contact", ];

  return (
    <div className="app__navigation">
      {navArr.map((item, index) => (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a 
            href={`#${item}`} 
            key={item + index}
            className="app__navigation-dot"
            style={active === item ? {backgroundColor : "#313BAC"} : {}}
            />
      ))}
    </div>
  );
}

export default NavigationDots
