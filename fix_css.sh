#!/bin/bash
# Reorder the first few lines of src/index.css
cat << 'INNER_EOF' > css_tmp
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono&family=Inter:wght@400;700;800&family=Plus+Jakarta+Sans:wght@700&family=Instrument+Serif:ital@0;1&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));
INNER_EOF
tail -n +7 src/index.css >> css_tmp
mv css_tmp src/index.css
