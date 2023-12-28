import React, { FC } from 'react';
import classes from './ConfigurationSelector.module.scss';
import clsx from 'clsx';

interface ConfigurationSelectorProps {
  memory: number[];
  setActiveMemory: React.Dispatch<React.SetStateAction<number>>;
  activeMemory: number;
  colours: string[];
  setActiveColour: React.Dispatch<React.SetStateAction<number>>;
  activeColour: number;
}

const ConfigurationSelector: FC<ConfigurationSelectorProps> = ({
  memory,
  colours,
  setActiveColour,
  setActiveMemory,
  activeMemory,
  activeColour,
}) => {
  return (
    <div className={classes.configurationSelector}>
      {memory.length !== 0 && (
        <ul className={classes.configurationSelector__list}>
          {memory.map((mem, index) => (
            <li
              key={mem}
              onClick={() => setActiveMemory(index)}
              className={clsx(
                classes.configurationSelector__item,
                activeMemory === index && classes.configurationSelector__active,
              )}>
              {mem} GB
            </li>
          ))}
        </ul>
      )}
      <ul className={classes.configurationSelector__list}>
        {colours.map((colour, index) => (
          <li
            key={colour}
            onClick={() => setActiveColour(index)}
            className={clsx(
              classes.configurationSelector__item,
              activeColour === index && classes.configurationSelector__active,
            )}>
            {colour}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfigurationSelector;
