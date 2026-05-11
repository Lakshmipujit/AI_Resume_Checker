from fastapi import FastAPI
from pydantic import BaseModel
import pdfplumber

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


class ResumeRequest(BaseModel):
    filePath: str


@app.post("/analyze")
async def analyze_resume(data: ResumeRequest):

    text = ""

    with pdfplumber.open(data.filePath) as pdf:
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