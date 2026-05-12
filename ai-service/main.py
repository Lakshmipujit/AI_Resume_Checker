from fastapi import FastAPI, UploadFile, File
import pdfplumber
import tempfile

app = FastAPI()

required_skills = {
    "python": 15,
    "javascript": 15,
    "react": 20,
    "node": 20,
    "mongodb": 15,
    "sql": 10,
    "java": 10
}

@app.get("/")
def home():
    return {"message": "FastAPI running"}

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):

    temp = tempfile.NamedTemporaryFile(delete=False)

    content = await file.read()

    temp.write(content)

    temp.close()

    text = ""

    with pdfplumber.open(temp.name) as pdf:

        for page in pdf.pages:

            extracted = page.extract_text()

            if extracted:
                text += extracted.lower()

    found_skills = []
    missing_skills = []

    score = 0

    for skill, weight in required_skills.items():

        if skill in text:
            found_skills.append(skill)
            score += weight

        else:
            missing_skills.append(skill)

    score = min(score, 100)

    return {
        "score": score,
        "matched_skills": found_skills,
        "missing_skills": missing_skills
    }