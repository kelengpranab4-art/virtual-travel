from fastapi import FastAPI
from app.routes.endpoints import router as ml_router

app = FastAPI(
    title="Immersive Travel Discovery ML Service",
    description="Modular AI service for travel recommendations and analysis",
    version="1.0.0"
)

# Register specialized routers
app.include_router(ml_router)

@app.get("/")
def read_root():
    return {"status": "online", "service": "ML core"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

