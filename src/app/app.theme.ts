import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const AUCS_PurplePalette = {
  50: '#f0eff8',
  100: '#e2e0f2',
  200: '#c6c2e5',
  300: '#a9a3d8',
  400: '#8d85cb',
  500: '#7066be',
  600: '#5449b0',
  700: '#453ca3',
  800: '#3B3486',
  900: '#302b69',
  950: '#1c193c'
};

export const aucsTheme = definePreset(Aura, {
  semantic: {
    primary: AUCS_PurplePalette,
  }
});
