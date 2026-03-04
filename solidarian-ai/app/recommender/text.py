def build_cause_text(
    title: str, description: str, tags: list[str], communities: list[str]
) -> str:
    parts = [
        title.strip(),
        description.strip(),
        " ".join(tags),
        " ".join(communities),
    ]
    return "\n".join([part for part in parts if part])
