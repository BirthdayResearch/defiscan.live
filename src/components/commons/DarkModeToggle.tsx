import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "@contexts/ThemeContext";
import classNames from "classnames";
import { Switch } from "@headlessui/react";
import { useState } from "react";

export function DarkModeToggle(props: { className?: string }): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === "dark");

  function handleToggle(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      onClick={handleToggle}
      className={classNames(
        "relative inline-flex h-8 w-16 items-center rounded-full relative bg-white dark:bg-dark-gray-200 ",
        props.className
      )}
      data-testid="DarkModeToggle"
    >
      <BsMoonFill
        size={22}
        className={classNames(
          "text-dark-blue-300 absolute hidden dark:left-1 dark:block"
        )}
      />
      <BsFillSunFill
        size={22}
        className={classNames("text-orange-500 absolute right-1 dark:hidden")}
      />
      <span
        className={classNames(
          "inline-block h-6 w-6 transform rounded-full transition ease-in-out duration-200 translate-x-1 bg-primary-700 dark:translate-x-9 dark:bg-black"
        )}
      />
    </Switch>
  );
}
