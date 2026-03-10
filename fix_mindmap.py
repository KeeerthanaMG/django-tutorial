import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the mermaid block
pattern = r'<div class="mermaid">\s*mindmap\s*root\(\(.*?\)\).*?Hackathon Tips\s*</div>'

new_mindmap = """<div class="mermaid">
mindmap
  root((Django Session))
    intro(Introduction)
      why[Why Django]
      web[Web Architecture]
    struct(Structure)
      proj[Project]
      app[App]
      mvt[MVT Architecture]
    core(Core Components)
      url[URL Routing]
      views[Views]
      models[Models and Database]
    db(Database Magic)
      mig[Migrations]
      admin[Django Admin]
    api(APIs and Launch)
      build[Building APIs]
      tips[Hackathon Tips]
                    </div>"""

text_new = re.sub(pattern, new_mindmap, text, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text_new)

print("Done replacing mermaid mindmap exactly.")
