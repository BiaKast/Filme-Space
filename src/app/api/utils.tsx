export function formatDateWithIntl(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function generateDecades(
  startDecade = new Date().getFullYear(),
  endDecade = 1950,
) {
  const decades = [];
  startDecade = Math.floor(startDecade / 10) * 10;

  for (let decade = startDecade; decade >= endDecade; decade -= 10) {
    decades.push(decade);
  }

  return decades;
}

export function generateYears(selectedDecade: number, upcomming?: string) {
  const yearsInDecade: number[] = [];
  const currentYear = new Date().getFullYear();
  const currentDecadeStart = Math.floor(currentYear / 10) * 10;

  if (upcomming) {
    for (let year = selectedDecade; year >= currentYear; year -= 1) {
      yearsInDecade.push(year);
    }
  } else {
    const endYear =
      currentDecadeStart === selectedDecade ? currentYear : selectedDecade + 9;
    for (let year = selectedDecade; year <= endYear; year++) {
      yearsInDecade.push(year);
    }
  }

  return yearsInDecade.sort((a, b) => b - a); // Ordena do mais recente para o mais antigo
}
